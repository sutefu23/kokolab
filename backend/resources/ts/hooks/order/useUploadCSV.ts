import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

type QueryParam = {
  csv: File,
  target_date: Date
}

const upload = async (params:QueryParam): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/orders/upload', params)
  return data  
}

const useUpload = (): UseMutationResult<
  Order[],
  AxiosError,
  QueryParam,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(upload, {
    onSuccess: (data) => {
      queryClient.setQueryData('orders', data)
    }
  })
}
export default useUpload;