import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

type QueryParam = {
  ids: Order["id"][],
  target_date: Date
}
const del = async (params:QueryParam): Promise<Order[]> => {
  const { data } = await axios.delete<Order[]>('/api/orders/delete', { data: params })
  return data  
}

const useDelete = (): UseMutationResult<
  Order[],
  AxiosError,
  QueryParam,
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