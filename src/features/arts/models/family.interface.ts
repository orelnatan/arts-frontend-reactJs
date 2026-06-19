import type { Entity } from "./entity.interface";

export interface Family extends Entity {
  symbol: string;
  categoryId: number;
}