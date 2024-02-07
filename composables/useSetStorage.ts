import localforage from "localforage";

export const useSetStorage = async (key: string, data: any): Promise<void> => {
  if (data) {
    await localforage.setItem(key, JSON.stringify(data));
  }
};
