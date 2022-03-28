import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

const settle = async (ids: Order["id"][]): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/orders/settle', ids)
  return data  
}

const useSettleShipping = (): UseMutationResult<
  Order[],
  AxiosError,
  Order["id"][],
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(settle, {
    onSuccess: (data) => {
      queryClient.setQueryData('orders', data)
    }
  })
}
export default useSettleShipping;