import { USER_ROLE } from "./user.constaint";

export type TUser = {
  email: string;
  name: string;
  role: "Student" | "Teacher";
  password: string;
  status: "Active" | "Disabled";
};

export type TUserRole = keyof typeof USER_ROLE;
