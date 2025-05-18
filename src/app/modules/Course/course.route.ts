import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ParcelValidation } from "./course.validation";
import { ParcelControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constait";

const router = express.Router();
// create parcel
router.post(
  "/",
  // auth(USER_ROLE['Super Admin'],USER_ROLE.Merchant),
  validateRequest(ParcelValidation.CreateParcelValidation),
  ParcelControllers.createParcel
);

// Get all parcel
router.get(
  "/",
  // auth("Super Admin","Delivery Man","Merchant"),
  ParcelControllers.getAllParcels
);

// Get single parcel
router.get("/:TrakingId", ParcelControllers.getSingleParcel);

// Update parcel
router.patch(
  "/:id",
  // auth("Super Admin","Merchant"),
  validateRequest(ParcelValidation.UpdateParcelValidation),
  ParcelControllers.updateleParcel
);

// Update parcel status
router.put(
  "/:id",
  // auth("Delivery Man","Super Admin"),
  validateRequest(ParcelValidation.UpdateParcelValidation),
  ParcelControllers.updateleParcelStaus
);

// Delete single parcel
router.delete(
  "/:id",
  // auth("Super Admin"),
  ParcelControllers.deleteSingleParcel
);

export const ParcelRoutes = router;
