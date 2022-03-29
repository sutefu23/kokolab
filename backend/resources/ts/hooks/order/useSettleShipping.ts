import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

type QueryParam = {
  ids: Order["id"][],
  target_date: Date
}
const settle = async (params:QueryParam): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/orders/settle', params)
  return data  
}

const useSettleShipping = (): UseMutationResult<
  Order[],
  AxiosError,
  QueryParam,
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