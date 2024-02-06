import localforage from "localforage";

interface IDayState {
    isHoliday: boolean;
    plan?: number;
    fact?: number;
}

export const useGetStorage = async (key: string): Promise<any> => {

    const data = await localforage.getItem(key);
    
    return data && typeof data === 'string' ? JSON.parse(data) : null;
}