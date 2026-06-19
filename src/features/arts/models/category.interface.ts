import type { Entity } from "./entity.interface";

export interface Category extends Entity {
  rank: number;
  brandId: number;
}