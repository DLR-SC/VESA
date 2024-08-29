import axios from "axios";
import { IDatasetID } from "../types/types";

const getPersistedDatasetId = async (): Promise<IDatasetID[]> => {
  try {
    const response = await axios.get("http://localhost:3001/persist");
    return response.data.keys || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function fetchPersistedDatasetIds(): Promise<IDatasetID[]> {
  const persistedDatasetId = await getPersistedDatasetId();
  return Array.isArray(persistedDatasetId) ? persistedDatasetId.flat() : [];
}

// Function to filter common dataset IDs
export function filterCommonDatasetIds(
  keys: IDatasetID[][],
  persistedDatasetId: IDatasetID[]
): IDatasetID[][] {
  return keys.map((innerArray) =>
    innerArray.filter((key) => persistedDatasetId.includes(key))
  );
}

/**
 * This function fetches the persisted dataset IDs from the backend server.
 * It then filters the common dataset IDs while maintaining the nested structure.
 * @returns {Promise<IDatasetID[]>} - The persisted dataset IDs
 * @throws {Error} - An error from the backend server
 * After every call, the keys array is reset to an empty array.
 */
