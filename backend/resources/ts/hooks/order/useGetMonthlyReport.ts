import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OrderMonthlyReport} from '../../models/order';

type QueryParam = {
  targetYear: number
  targetMonth: number
}

const getMonthlyReport = async ({targetYear, targetMonth}:QueryParam): Promise<OrderMonthlyReport[]> => {
  const { data } = await axios.get<OrderMonthlyReport[]>('/api/orders/report',{ params: { targetYear, targetMonth }});
  return data;
};

const useGetMonthlyReportQuery = <TData = OrderMonthlyReport[]>({targetYear, targetMonth}: QueryParam,
  options?: UseQueryOptions<OrderMonthlyReport[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery(['groupByItem', targetYear, targetMonth], () => getMonthlyReport({targetYear, targetMonth}), options);

export default useGetMonthlyReportQuery;