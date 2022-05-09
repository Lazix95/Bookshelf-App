import { Schema, model } from 'mongoose';

export interface CollectionType {
  name: string,
  imageUrl: string,
  storageRef: string
}

const collectionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  books:[{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  storageRef: {
    type: String,
    required: function () {
      return !!this.imageUrl;
    },
  },
})

collectionSchema.method('toJSON', function() {
  const collection = this.toObject();
  collection.id = collection._id;
  delete collection._id;
  delete collection.__v;
  return collection;
});

export const Collection = model<CollectionType>('Collection', collectionSchema);
