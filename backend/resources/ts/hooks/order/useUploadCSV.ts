import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order } from '../../models/order';

type FormData = {
  file: Blob
}

const upload = async (formData: FormData): Promise<Order[]> => {
  const { data } = await axios.post<Order[]>('/api/upload', formData)
  return data  
}

const useUpload = (): UseMutationResult<
  Order[],
  AxiosError,
  FormData,
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