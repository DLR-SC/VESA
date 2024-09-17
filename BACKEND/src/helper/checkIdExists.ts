import { isValidIdQuery, isValidIdArrayQuery } from "../queries/validIdQuery";

export const checkIdExists = async (id: string, database: any) => {
  const cursor = await database.query(isValidIdQuery, {
    key: id,
  });
  const result = await cursor.all();
  return result[0];
};

export const checkIdArrayExists = async (ids: string[], database: any) => {
  const cursor = await database.query(isValidIdQuery, {
    keys: ids,
  });
  const result = await cursor.all();
  return result;
};

/**
 * This function is used to check if the id exists in the Dataset or STACCollection
 * @id - The id to be checked
 * @database - The database to be queried
 *
 * @returns - true if the id exists in either of the collections
 */
