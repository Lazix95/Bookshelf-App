import admin, { storage } from 'firebase-admin';
import { v4 } from 'uuid'
import sharp from 'sharp';
import fs from 'fs';

import serviceAccount from '../../env/firebase_admin--dev.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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

  const data = await storageRef.upload(reducedSizePath, {
    public: true,
    destination: `images/CCSA---aSDSD---${req.file.filename}`,
    metadata: {
      firebaseStorageDownloadTokens: v4(),
    }
  });

  //const name = data[1].name;

   //const del = await storageRef.file(name).delete()

 // res.json(del);

  fs.unlink(path, (err) => console.log('Error => ', err));
  fs.unlink(reducedSizePath, (err) => console.log('Error => ', err));
  req.file.mediaLink = data[1].mediaLink;
  req.file.storageRef = data[1].name;
  next();
}

export const deleteStorageFile = async (refName) => {
  const imageRef = storageRef.file(refName);
  return await imageRef.delete();
}

export default uploadFile
