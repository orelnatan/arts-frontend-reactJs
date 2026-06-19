import type { Entity } from "./entity.interface";

export interface Product extends Entity {
  height: number;
  width: number;
  weight: number;
  added: string;
  price: number;
  familyId: number;
}