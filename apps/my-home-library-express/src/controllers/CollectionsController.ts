import { Collection } from '../models/collectionModel';
import { hasKey } from '../utils/controllerUtilFunctions';
import Err from '../types/Err';
import { deleteStorageFile } from '../middleware/firebaseStorage';


export const getCollectionToReq = (req, res, next) => {
  try {
    const collectionID = req.params.collectionID;
    const collection = Collection.findOne({ _id: collectionID, user: req.user._id }).populate('books');

    if (!collection) {
      const error = new Err('Collection Not Found!');
      error.status = 404;
      next(error);
      return
    }

    req.collection = collection;
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}

export const getCollections = async (req, res, next) => {
  try {
    const collections = Collection.find({ user: req.user._id });
    res.status(200).json({collections});
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}

export const getOneCollection = async (req, res, next) => {
  try {
    const collection = req.collection;
    res.status(200).json({ collection });
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}

export const postCollection = async (req, res, next) => {
  try {
    const { name, books } = req.body;
    const imageUrl = req?.file?.mediaLink;
    const storageRef = req?.file?.storageRef;
    const user = req.user._id;

    const collection = new Collection({name, books: books ? books : [], user, imageUrl, storageRef});
    await collection.save()

    res.status(201).json({collection});
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}

export const putCollection = async (req, res, next) => {
  try {
    const body = req.body;
    const deleteCover = req.body.deleteCover;
    const collectionID = req.params.collectionID;
    const imageUrl = req?.file?.mediaLink;
    const storageRef = req?.file?.storageRef;

    const currentCollection = req.collection;

    const updatePayload = {
      ...(hasKey(body, 'name') && { name: body.name }),
      ...(hasKey(body, 'books') && { books: body.books }),
      ...(deleteCover && { imageUrl: "", storageRef: "" }),
      ...(imageUrl && { imageUrl }),
      ...(storageRef && { storageRef }),
    }

    if (deleteCover && currentCollection && currentCollection.imageUrl || storageRef && currentCollection && currentCollection.storageRef) {
      await deleteStorageFile(currentCollection.storageRef)
    }

    const collection = await Collection.findOneAndUpdate({_id: collectionID, user: req.user._id}, updatePayload, {new: true});

    res.status(200).json({ collection });
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}

export const deleteCollection = async (req, res, next) => {
  try {
    const collection = req.collection;
    if (collection.storageRef) await deleteStorageFile(collection.storageRef);
    await collection.delete();

    res.status(200).json({status: 'OK'});
  } catch (err) {
    if (err.status) err.status = 500
    next(err)
  }
}
