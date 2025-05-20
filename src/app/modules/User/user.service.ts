import {  TUser } from "./user.interface";
import { User } from "./user.model";

// get all users
const getAllUsers = async () => {
  const users = User.find();
  return users;
};

// get single users
const getSingleUser = async (_id: string) => {
  const user = User.findById({ _id });
  return user;
};


// Update User
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete User
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({_id:id});
  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
