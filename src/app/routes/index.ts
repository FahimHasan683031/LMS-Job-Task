import { Router } from "express";
import { SuperAdimnRoutes } from "../modules/superAdmin/superAdmin.route";
import { AuthRoutes } from "../modules/auth/auth.rout";
import { DeliveryManRoutes } from "../modules/Delivery Man/deliveryMan.route";
import { MerchantRoutes } from "../modules/Merchant/Merchant.route";
import { ParcelRoutes } from "../modules/Parcel/parcel.route";
import { BranchRoutes } from "../modules/Branch/branch.route";
import { ToDoRoutes } from "../modules/ToDo/toDo.route";
import { DeliveryCategoryRoutes } from "../modules/DeliveryCategory/deliveryCategory.route";
import { DeliveryChargeRoutes } from "../modules/Delivery Charge/deliveryCharge.route";
import { LiquidFragileRoutes } from "../modules/LiquidFragile/liquidFragile.route";

const router = Router(); // Create a new Router instance

// Define paths and their route handlers
const moduleRoutes = [
  { path: "/superAdmin", route: SuperAdimnRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/deliveryMan", route: DeliveryManRoutes },
  { path: "/merchant", route: MerchantRoutes },
  { path: "/parcel", route: ParcelRoutes },
  { path: "/branch", route: BranchRoutes },
  { path: "/toDo", route: ToDoRoutes },
  { path: "/deliveryCategory", route:DeliveryCategoryRoutes },
  { path: "/deliveryCharge", route:DeliveryChargeRoutes },
  { path: "/liquidFragile", route:LiquidFragileRoutes },

];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; // Export the router to be used in the main app
