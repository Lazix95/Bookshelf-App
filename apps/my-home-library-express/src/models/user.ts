import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    lowercase: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    toJSON: false,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  }
})

export interface UserType{
  email: string,
  password:string,
  firstName: string,
  lastName: string,
}

userSchema.method('toJSON', function() {
  const user = this.toObject();
  delete (user as any).password;
  delete (user as any ).__v;
  delete (user as any )._id;
  return user;
})

export const User = mongoose.model<UserType>('User', userSchema);
