/**
 * Replaces matching keyword instances inside a string with HTML mark tags.
 * Note: When rendering this in React, you will need to use `dangerouslySetInnerHTML`.
 */
export const highlightText = (value: string, keyword: string): string => {
  if (!keyword) return value;
  
  const regex = new RegExp(keyword, 'gi');
  return value.replace(regex, (match) => `<mark>${match}</mark>`);
};