import React, { useState, useMemo, useCallback, useEffect } from "react";
import dayjs from 'dayjs';
import { OrderMonthlyReport } from '../../models/order';
import MultiLineChart from "./MultiLineChart"
import useGetMonthlyReport, { QueryParam } from "../../hooks/order/useGetMonthlyReport";
type DisplayChartProps = {
  report: OrderMonthlyReport
}

const DisplayChart = ({report}:DisplayChartProps) => {
  const [isShowHistoryData, setIsShowHistoryData] = useState(false)

  const prevDate = useMemo(() => {
    return dayjs(report.daily_summary[0].day).subtract(1, "month")
  },[report])

  const { status:prevReportStatus , data: prevReportData } = useGetMonthlyReport({targetYear: Number(prevDate.format('YYYY')), targetMonth: Number(prevDate.format('MM')), itemCode: report.item_code});
  
  const [prevReport, setPrevReport] = useState<OrderMonthlyReport|undefined>(undefined)


  useEffect(() => {
    if(!isShowHistoryData) return 
    if(prevReportStatus === 'success' ){
      setPrevReport(prevReportData[0])
    }
  },[isShowHistoryData, prevReportData, prevReportStatus])

  const chartData = useMemo(() => {
    const productName = report.product_name
    const days = report.daily_summary.map((data) => dayjs(data.day).format("DD"))
    const counts = report.daily_summary.map((data) => data.count)
    const subtotals = report.daily_summary.map((data) => data.subtotal)
    return {
      title: productName,
      labels: days,
      dataset1: {
        name: "件数",
        data: counts
      },
      dataset2: {
        name: "金額",
        data: subtotals
      }
    }
  },[report])

  const historyChartData = useMemo(() => {
    if(!prevReport) return undefined
    if(!isShowHistoryData) return undefined
    const prevDays = report.daily_summary.map((data) => dayjs(data.day).format("DD"))
    const prevCounts = prevReport.daily_summary.map((data) => data.count)
    const subtotals = prevReport.daily_summary.map((data) => data.subtotal)
    const labels = (prevDays.length > chartData.labels.length) ? prevDays : chartData.labels // 過去のデータの方の日付が多ければラベルを更新
    return {
      labels,
      dataset3: {
        name: "件数(前月)",
        data: prevCounts
      },
      dataset4: {
        name: "金額(前月)",
        data: subtotals
      }
    }
  },[chartData.labels, isShowHistoryData, prevReport, report.daily_summary])

  const MultiChartMemorized = useMemo(() => chartData && <MultiLineChart {...{...chartData,...historyChartData}}/>,[chartData, historyChartData])

  return (
    <>
    <label>
    <input type="checkbox" checked={isShowHistoryData} onChange={(e) => setIsShowHistoryData(e.target.checked)}/>
      過去のデータと比較する
    </label>
   {MultiChartMemorized}
   </>
  )
}

export default DisplayChart