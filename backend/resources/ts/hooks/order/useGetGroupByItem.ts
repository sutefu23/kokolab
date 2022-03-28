import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OrderGroupByItem} from '../../models/order';

type QueryParam = {
  fromDate?: Date,
  toDate?: Date
}

const getGroupByItem = async ({fromDate, toDate}:QueryParam): Promise<OrderGroupByItem[]> => {
  const { data } = await axios.get<OrderGroupByItem[]>('/api/orders/group_by_item',{ params: { fromDate, toDate }});
  return data;
};

const useGetGroupByItemQuery = <TData = OrderGroupByItem[]>({fromDate, toDate}: QueryParam,
  options?: UseQueryOptions<OrderGroupByItem[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery(['groupByItem', fromDate, toDate], () => getGroupByItem({fromDate, toDate}), options);

export default useGetGroupByItemQuery;