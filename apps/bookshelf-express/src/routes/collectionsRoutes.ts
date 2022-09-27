import express from 'express';
import isAuth from '../middleware/isAuth';
import {
  getCollections,
  getCollectionToReq,
  getOneCollection,
  postCollection,
  putCollection,
} from '../controllers/CollectionsController';
import multer from '../middleware/multer';
import { required } from '../validators/fieldValidators';
import { validateObjectIdQueryFnc } from '../validators/queryValidators';
import { runValidator } from '../validators';
import uploadFile from '../middleware/firebaseStorage';
const router = express.Router();

const isObjectId = validateObjectIdQueryFnc('collectionID', 'Collection Not Found!!!!');

router.get('/collections', isAuth, getCollections);
router.get('/collections/:collectionID', isAuth, isObjectId, runValidator, getCollectionToReq, getOneCollection);

router.post('/collections', isAuth, multer, required('name'), runValidator, uploadFile, postCollection);
router.put('/collections/:collectionID', isAuth, multer, isObjectId, required('name'), runValidator, getCollectionToReq, putCollection);
