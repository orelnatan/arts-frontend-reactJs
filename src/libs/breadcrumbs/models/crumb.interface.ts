export interface Crumb {
  id: string
  path: string
  label?: string
  image?: string
  color?: string
  skip?: boolean
  namespace?: string
  keyPrefix?: string
  disabled?: boolean
  resolve?: string
  async?: Promise<Crumb>
}
