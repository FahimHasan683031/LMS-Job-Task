import { z } from "zod";

const CreateParcelValidation = z.object({
  merchantName: z.string(),
  merchantEmail: z.string(),
  merchantPhone: z.string(),
  merchantAddress: z.string(),
  cashCollection: z.number(),
  sellingPrice: z.number(),
  deliveryType: z.enum(["Same Day", "Next Day", "Sub City", "Outside City"]),
  Weight: z.number(),
  customerName: z.string(),
  customerPhone: z.string(),
  customerAddress: z.string(),
  note: z.string().optional(),
  packaging: z.enum(["Poly", "Bubble Poly", "Box", "Box Poly"]),
  priority: z.enum(["Normal", "High"]),
  paymentMethod: z.enum(["COD"]),
  deliveryCharge: z.number(),
  liquidORFragile: z.number().optional(),
  codCharge: z.number(),
  totalCharge: z.number(),
  vat: z.number(),
  netPayable: z.number(),
  advance: z.number(),
  currentPayable: z.number(),
  branchname: z.string(),
});

const UpdateParcelValidation = z.object({
  merchantName: z.string().optional(),
  merchantEmail: z.string().optional(),
  merchantAddress: z.string().optional(),
  merchantPhone: z.string().optional(),
  cashCollection: z.number().optional(),
  sellingPrice: z.number().optional(),
  deliveryType: z
    .enum(["Same Day", "Next Day", "Sub City", "Outside City"])
    .optional(),
  Weight: z.number().optional(),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  note: z.string().optional().optional(),
  packaging: z.enum(["Poly", "Bubble Poly", "Box", "Box Poly"]).optional(),
  priority: z.enum(["Normal", "High"]).optional(),
  paymentMethod: z.enum(["COD"]).optional(),
  deliveryCharge: z.number().optional(),
  liquidORFragile: z.number().optional().optional(),
  codCharge: z.number().optional(),
  totalCharge: z.number().optional(),
  vat: z.number().optional(),
  netPayable: z.number().optional(),
  advance: z.number().optional(),
  currentPayable: z.number().optional(),
  parcelStatus: z.array(z.object({})).optional(),
  branchname: z.string().optional(),
});

export const ParcelValidation = {
  CreateParcelValidation,
  UpdateParcelValidation,
};
