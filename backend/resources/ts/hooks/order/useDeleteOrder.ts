import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

const del = async (ids: Order["id"][]): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/orders/delete', ids)
  return data  
}

const useDelete = (): UseMutationResult<
  Order[],
  AxiosError,
  Order["id"][],
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(del, {
    onSuccess: (data) => {
      queryClient.setQueryData('orders', data)
    }
  })
}
export default useDelete;