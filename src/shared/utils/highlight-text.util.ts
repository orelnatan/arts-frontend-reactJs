export const highlightText = (value: string, keyword: string): string => {
  if (!keyword) return value

  const regex = new RegExp(keyword, 'gi')
  return value.replace(regex, (match) => `<mark>${match}</mark>`)
}
