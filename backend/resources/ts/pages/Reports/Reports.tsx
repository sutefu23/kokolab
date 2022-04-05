import React, { useState, useCallback, useEffect,useMemo } from "react";
import dayjs from "dayjs";
import { useGetMonthlyReport} from '../../hooks/order';
import './Reports.css';
import MultiBarChart from './MultiBarChart'
import { OrderMonthlyReport} from '../../models/order';

const Reports :React.FC = () => {
  const [ targetYear , setTargetYear ] = useState<number>(dayjs().year())
  const [ targetMonth , setTargetMonth ] = useState<number>(dayjs().month()+1)


  const { status:reportStatus , data: reportData , error: reportErr } = useGetMonthlyReport({targetYear, targetMonth});
  const { status:reportPrevStatus , data: reportPrevData , error: reportPrevErr } = useGetMonthlyReport({targetYear, targetMonth});
  const [ reports, setReports ] = useState<typeof reportData>(reportData)
  const [ prevReports, setPrevReports ] = useState<typeof reportData>(undefined)

  useEffect(() => {
    if (reportStatus === "success") {
        setReports(reportData)
    }
}, [reportStatus, reportData]);

  const days = useCallback(() => {//1～月末日までの配列
    const lastDay = dayjs(new Date(targetMonth, targetMonth - 1, 1).toLocaleString()).endOf("month").date()
    return [...Array<number>(lastDay)].map((_, i) => i + 1)
  }, [targetMonth])

  const [selectedIndex, setSelectedIndex] = useState<number|undefined>(undefined);
  const [hoveredIndex, setHoveredIndex] = useState<number|undefined>(undefined);
  const [isShowHistoryData, setIsShowHistoryData] = useState(false)

  const chartData = useMemo(() => {
    if(selectedIndex !==undefined && reports !== undefined){
      const productName = reports[selectedIndex].product_name
      const days = reports[selectedIndex].daily_summary.map((data) => dayjs(data.day).format("DD"))
      const counts = reports[selectedIndex].daily_summary.map((data) => data.count)
      const subtotals = reports[selectedIndex].daily_summary.map((data) => data.subtotal)
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
    }
  },[reports, selectedIndex])




  const MultiChartMemorized = useMemo(() => chartData && <MultiBarChart {...chartData}/>,[chartData])

  const dailyTotal = useCallback((report: OrderMonthlyReport) => {
    if(!reports){ return { totalCount: 0, totalSubtotal: 0}}

    const totalCount = report.daily_summary.reduce((prev, data) => {
      return prev + Number(data.count)
    }, 0)
    const totalSubtotal = report.daily_summary.reduce((prev, data) => {
      return prev + Number(data.subtotal)
    }, 0)
    return {
      totalCount,
      totalSubtotal
    }
  },[reports])

  return (
  <>
    <h1 className="h3 mb-2 text-gray-800">月次集計</h1>
    <div className="col-xl-12 col-lg-12">
   <div className="card shadow mb-4">
      <div className="card-header py-3">
         <h6 className="m-0 font-weight-bold text-green">
           商品データ 
           <input type="month" name="select-month" className="select-month"
                value={`${targetYear}-${String(targetMonth).padStart(2, '0')}`}
                onChange={(e) => {
                  if(e.currentTarget.value){
                    const val = e.currentTarget.value.split('-')
                    setTargetYear(Number(val[0]))
                    setTargetMonth(Number(val[1]))
                  }
              }}
          />
         </h6>
         <div className="header-buttons"></div>
      </div>
      <div className="card-body">
         <div className="table-responsive portlet report-list">
            <table className="table">
               <thead className="thead-light">
                <tr>
                  <th colSpan={2}>商品名</th>
                  <th>合計</th>
                  {days().map((d) => (
                  <th key={d}>
                  {d}
                  </th>
                  ))}
                </tr>
               </thead>
               <tbody>
               {reports && reports.map((report, i) => (
                <React.Fragment key={i}>
                    <tr
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(undefined)}
                      onClick={() => setSelectedIndex(i)}
                      className={`${hoveredIndex===i ? "hovered":""} ${selectedIndex===i ? "selected":""}`}
                    >
                      <th className="product_name" rowSpan={2}>
                      {report.product_name}
                      </th>
                      <th>件数</th>
                      <td className="total">
                      {dailyTotal(report).totalCount}
                      </td>
                      {report.daily_summary.map((data, j) => (
                        <td key={j}>{data.count}</td>
                      ))}
                      </tr>
                    <tr
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(undefined)}
                      onClick={() => setSelectedIndex(i)}
                      className={`${hoveredIndex===i ? "hovered":""} ${selectedIndex===i ? "selected":""}`}
                    >
                      <th>金額</th>
                      <td className="total">
                        {dailyTotal(report).totalSubtotal.toLocaleString('ja-JP')}
                      </td>
                      {report.daily_summary.map((data, j) => (
                        <td key={j}>{Number(data.subtotal).toLocaleString('ja-JP')}</td>
                      ))}
                    </tr>
                  </React.Fragment>
              ))}
               </tbody>
            </table>
         </div>
      </div>
   </div>
   {
     selectedIndex !== undefined && 
     <>
      <label>
      <input type="checkbox" checked={isShowHistoryData} onChange={(e) => setIsShowHistoryData(e.target.checked)}/>
        過去のデータと比較する
      </label>
     {MultiChartMemorized}
     </>
   }
</div>
  </>)
}

export default Reports