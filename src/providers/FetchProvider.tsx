import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "./UserStore";
const GATEWAY = import.meta.env.VITE_GATEWAY;

export const useFetchData = () => {
  const BEARER_TOKEN = useUserStore((state) => state.accessToken);

  const getData = <T,>(key: string, endPoint: string) =>
    useQuery<T>({
      queryKey: [key],
      queryFn: async () => {
        const { data } = await axios.get<T>(`${GATEWAY}${endPoint}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        return data;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  const postData = <T, K>(endPoint: string) =>
    useMutation<T, Error, K>({
      mutationFn: async (inputData: K) => {
        const { data } = await axios.post(`${GATEWAY}${endPoint}`, inputData, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        return data;
      },
    });

  return { getData, postData };
};
