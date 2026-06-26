import type { Entity } from "../models";

/**
 * Filters an array of entities based on a case-insensitive keyword match against their name.
 */
export const filterEntities = <T extends Entity>(
  entities: T[], 
  keyword: string
): T[] => {
  if (!keyword) return entities;
  
  const lowerKeyword = keyword.toLowerCase();
  return entities.filter((entity) => 
    entity.name.toLowerCase().includes(lowerKeyword)
  );
};