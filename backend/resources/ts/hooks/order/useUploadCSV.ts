import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

const upload = async (csv: File): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/orders/upload', csv)
  return data  
}

const useUpload = (): UseMutationResult<
  Order[],
  AxiosError,
  File,
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