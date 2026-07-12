import { numericFormatter, type NumericFormatProps } from 'react-number-format'

/**
 * Pure utility function to format a numeric string using react-number-format configurations.
 *
 * @param value The raw string number to be formatted
 * @param options Formatting rules (thousandSeparator, decimalScale, prefix, suffix, etc.)
 * @returns The cleanly formatted string
 */
export function decimalFormatter(
  value: string | number | null | undefined,
  options: NumericFormatProps
): string {
  return numericFormatter(String(value), options)
}
