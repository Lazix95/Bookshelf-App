import admin from 'firebase-admin';
import { v4 } from 'uuid'
import sharp from 'sharp';
import fs from 'fs';
import Err from '../types/Err';

const firebaseEnv: unknown = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIBATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseEnv)
});

const storageRef = admin.storage().bucket(`gs://my-bookshelf-8184a.appspot.com`);

const uploadFile = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const path = req.file.path.replace("\\", "/");
  const reducedSizePath = `images/smaller/${req.file.filename}`;
  await sharp(path).jpeg({ mozjpeg: true }).toFile(reducedSizePath);
  let data;

  try {
    data = await storageRef.upload(reducedSizePath, {
      public: true,
      destination: `images/${req.file.filename}`,
      metadata: {
        firebaseStorageDownloadTokens: v4(),
      }
    });
  } catch (e) {
    const error = new Err('Unable to save cover.');
    error.status = 403;

    fs.unlink(path, unlinkCallback);
    fs.unlink(reducedSizePath, unlinkCallback);
    next(error);
    return;
  }

  fs.unlink(path, unlinkCallback);
  fs.unlink(reducedSizePath, unlinkCallback);
  req.file.mediaLink = data[1].mediaLink;
  req.file.storageRef = data[1].name;
  next();
}

export const deleteStorageFile = async (refName) => {
  const imageRef = storageRef.file(refName);
  return await imageRef.delete();
}

export default uploadFile

function unlinkCallback(err) {
  if (err) console.log('Error => ', err)
  return;
}
