import { TParcel } from "./course.interface";
import QueryBuilder from "../../builder/queryBuilder";
import { Parcel } from "./course.model";
import { v4 as uuidv4 } from "uuid";
import { TUser } from "../auth/auth.interface";
import { generateStatus } from "./course.utils";

const createParcelintoDB = async (payload: TParcel, user: TUser) => {
  // Generate Tracking Id
  const TrakingId = `CQBD${uuidv4().replace(/\D/g, "").substring(0, 10)}`;
  // Generate Status
  const status = await generateStatus({ title: "Parcel Create", user });

  const parcel = { ...payload, TrakingId, parcelStatus: [status] };
  const result = await Parcel.create(parcel);
  return result;
};

const getAllParcelFromDB = async (query: Record<string, unknown>) => {
  const ParcelQuery = new QueryBuilder(Parcel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ParcelQuery.modelQuery;
  return result;
};

const getSingleParcelFromDB = async (TrakingId: string) => {
  const result = await Parcel.findOne({ TrakingId: TrakingId });
  return result;
};

// Update Parcel
const UpdateParcel = async (id: string, payload: Partial<TParcel>) => {
  const result = await Parcel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const UpdateParcelStatus = async (id: string, payload: any, user: TUser) => {
  const parcel = await Parcel.findOne({ _id: id });

  if (!parcel) {
    return "Parcel Not Found";
  }

  // Generate new status
  const status = await generateStatus({ ...payload, user });

  if (!status) {
    throw new Error("Failed to generate a valid status");
  }
  parcel.currentStatus = payload?.title;

  parcel.parcelStatus.push(status);
  await parcel.save();
  return parcel;
};

// delete single parcel
const deleteSingleParcel = async (id: string) => {
  const result = await Parcel.deleteOne({ _id: id });
  return result;
};

export const parcelServices = {
  createParcelintoDB,
  getAllParcelFromDB,
  getSingleParcelFromDB,
  UpdateParcel,
  deleteSingleParcel,
  UpdateParcelStatus,
};
