import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OrderGroupByItem} from '../../models/order';

const getGroupByItem = async (): Promise<OrderGroupByItem[]> => {
  const { data } = await axios.get<OrderGroupByItem[]>('/api/orders/group_by_item');
  return data;
};

const useGetGroupByItemQuery = <TData = OrderGroupByItem[]>(
  options?: UseQueryOptions<OrderGroupByItem[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery('groupByItem', getGroupByItem, options);

export default useGetGroupByItemQuery;