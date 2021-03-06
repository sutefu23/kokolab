import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OrderColorMaster} from '../../models/order';

const getColorMaster = async (): Promise<OrderColorMaster[]> => {
  const { data } = await axios.get<OrderColorMaster[]>('/api/orders/color');
  return data;
};

const useGetOrderColorQuery = <TData = OrderColorMaster[]>(
  options?: UseQueryOptions<OrderColorMaster[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery('colorMaster', getColorMaster, options);

export default useGetOrderColorQuery;