import localforage from "localforage";

export const useClearStorage = async(key?: string): Promise<void> => {
    if (key) {
        await localforage.removeItem(key);
    } else {
        await localforage.clear();
    }
}