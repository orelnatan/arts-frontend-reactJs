import { parseISO, format as dataFnsFormat } from 'date-fns'

export function dateFormat(
  value?: string,
  format: string = 'dd/MM/yyyy'
): string {
  if (!value) return ''

  return dataFnsFormat(parseISO(value), format)
}
