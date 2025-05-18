import mongoose, { Schema } from "mongoose";
import { TParcel } from "./course.interface";

const deliveryTypes = ["Same Day", "Next Day", "Sub City", "Outside City"];
const packagingTypes = ["Poly", "Bubble Poly", "Box", "Box Poly"];
const priorityTypes = ["Normal", "High"];
const paymentMethods = ["COD"];

// Mongoose parcel Schema
const ParcelSchema = new Schema<TParcel>(
  {
    TrakingId: { type: String, unique: true, required: true },
    merchantEmail: { type: String, required: true },
    merchantName: { type: String, required: true },
    merchantAddress: { type: String, required: true },
    merchantPhone: { type: String, required: true },
    cashCollection: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    deliveryType: { type: String, enum: deliveryTypes, required: true },
    Weight: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    note: { type: String },
    packaging: { type: String, enum: packagingTypes, required: true },
    priority: { type: String, enum: priorityTypes, required: true },
    paymentMethod: { type: String, enum: paymentMethods, required: true },
    deliveryCharge: { type: Number, required: true },
    liquidORFragile: { type: Number },
    codCharge: { type: Number, required: true },
    totalCharge: { type: Number, required: true },
    vat: { type: Number, required: true },
    netPayable: { type: Number, required: true },
    advance: { type: Number, required: true },
    currentPayable: { type: Number, required: true },
    currentStatus: { type: String, default: "Parcel Create" },
    parcelStatus: { type: [Schema.Types.Mixed], required: true },
    branchname: { type: String, required: true },
  },
  { timestamps: true }
);

// Mongoose parcel model
export const Parcel = mongoose.model<TParcel>("Parcel", ParcelSchema);
