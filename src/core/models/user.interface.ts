import { UserType } from "./user-type.enum";

export interface User {
  id: number;
  avatar: string;
  index: number;
  name: string;
  password: string;
  registered: string;
  description: string;
  email: string;
  phone: string;
  type: UserType;
  company: string;
  address: string;
}