import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Order} from '../../models/order';

type QueryParam = {
  fromDate?: Date,
  toDate?: Date
}
const getOrders = async ({fromDate, toDate}:QueryParam): Promise<Order[]> => {
  const { data } = await axios.get<Order[]>(`/api/orders`,{ params: { fromDate, toDate }});
  return data;
};

const useGetOrdersQuery = <TData = Order[]>({fromDate, toDate}: QueryParam,
  options?: UseQueryOptions<Order[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery(['orders', fromDate, toDate], () => getOrders({fromDate, toDate}), options);

export default useGetOrdersQuery;