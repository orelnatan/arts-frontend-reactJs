import { Direction, Locale } from "../models";

export const DIRECTION_BY_LOCALE: Record<Locale, Direction> = {
  [Locale.En]: Direction.LTR,
  [Locale.He]: Direction.RTL,
}