import { USER_ROLE } from "./auth.constait";

export type TUser={
  email: string,
  name: string,
  role: string,
  password: string;
  status: "Active" | "Disabled";
}

export type TLoginUser = {
    email: string;
    password: string;
  };

export type TCurrentUser = {
  email:string;
  role:string;
}


export type TUserRole = keyof typeof USER_ROLE;