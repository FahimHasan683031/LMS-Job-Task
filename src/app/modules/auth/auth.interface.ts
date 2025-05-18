import { USER_ROLE } from "./auth.constait";

export type TLoginUser = {
    emailORphone: string;
    password: string;
  };

export type TCurrentUser = {
  email:string;
  role:string;
}

export type TUser={
  email: string,
  name: string,
  phone: string,
  role: string
}

export type TUserRole = keyof typeof USER_ROLE;