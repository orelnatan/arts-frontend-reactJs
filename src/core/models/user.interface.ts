import type { UserType } from "./user-type.enum";
import type { Locale } from "./locale.enum";
import type { Theme } from "./theme.enum";

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
  locale: Locale;
  theme: Theme;
}