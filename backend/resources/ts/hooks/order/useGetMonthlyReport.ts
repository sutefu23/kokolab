import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import axios, { AxiosError } from "axios";
import { OrderMonthlyReport } from "../../models/order";

export type QueryParam = {
    targetYear: number;
    targetMonth: number;
    itemCode?: string;
};

const getMonthlyReport = async ({
    targetYear,
    targetMonth,
    itemCode,
}: QueryParam): Promise<OrderMonthlyReport[]> => {
    const { data } = await axios.get<OrderMonthlyReport[]>(
        "/api/orders/report",
        { params: { targetYear, targetMonth, itemCode } }
    );
    return data;
};

const useGetMonthlyReportQuery = <TData = OrderMonthlyReport[]>(
    { targetYear, targetMonth, itemCode }: QueryParam,
    options?: Omit<
        UseQueryOptions<
            OrderMonthlyReport[],
            AxiosError,
            TData,
            (string | number)[]
        >,
        "queryKey" | "queryFn"
    >
): QueryObserverResult<TData, AxiosError> =>
    useQuery(
        ["groupByItem", targetYear, targetMonth] as (string | number)[],
        () => getMonthlyReport({ targetYear, targetMonth, itemCode }),
        options
    );

export default useGetMonthlyReportQuery;
