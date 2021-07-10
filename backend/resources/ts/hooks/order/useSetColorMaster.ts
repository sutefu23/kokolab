import { useQueryClient, useMutation, UseMutationResult } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OrderColorMaster} from '../../models/order';


const setUpMaster = async (master: OrderColorMaster[]): Promise<OrderColorMaster[]> => {
  const { data } = await axios.post<OrderColorMaster[]>('/api/orders/color', master)
  return data  
}

const useSetColorMaster = (): UseMutationResult<
  OrderColorMaster[],
  AxiosError,
  OrderColorMaster[],
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(setUpMaster, {
    onSuccess: (data) => {
      queryClient.setQueryData('colorMaster', data)
    }
  })
}
export default useSetColorMaster;