import { z } from "zod";

const CreateUserValidationSchema = z.object({
  Name: z.string({ required_error: "Name is required." }),
  email: z.string({ required_error: "Email is required." }),
  password: z.string({ required_error: "Password is required" }),
});



export const AuthValidation = {
  CreateUserValidationSchema,
};
