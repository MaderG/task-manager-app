import useSWR from "swr";

export const useUser = (key) => useSWR(key);
