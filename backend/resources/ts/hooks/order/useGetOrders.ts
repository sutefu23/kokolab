import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order} from '../../models/order';

const getOrders = async (): Promise<[Order]> => {
  const { data } = await axios.get<[Order]>('/api/orders');
  return data;
};

const useGetOrdersQuery = <TData = [Order]>(
  options?: UseQueryOptions<[Order], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery('orders', getOrders, options);

export default useGetOrdersQuery;