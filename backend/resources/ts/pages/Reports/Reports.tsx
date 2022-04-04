import React, { useState, useCallback, useEffect,useMemo } from "react";
import dayjs from "dayjs";
import { useGetMonthlyReport} from '../../hooks/order';
import './Reports.css';
import MultiLineChart from './Chart'
const Reports :React.FC = () => {
  const [ targetYear , setTargetYear ] = useState<number>(dayjs().year())
  const [ targetMonth , setTargetMonth ] = useState<number>(dayjs().month()+1)


  const { status:groupStatus , data: groupData , error: groupErr } = useGetMonthlyReport({targetYear, targetMonth});
  const [ reports, setReports ] = useState<typeof groupData>(groupData)

  useEffect(() => {
    if (groupStatus === "success") {
        setReports(groupData)
    }
}, [groupStatus, groupData]);

  const days = useCallback(() => {//1～月末日までの配列
    const lastDay = dayjs(new Date(targetMonth, targetMonth - 1, 1).toLocaleString()).endOf("month").date()
    return [...Array<number>(lastDay)].map((_, i) => i + 1)
  }, [targetMonth])

  const [selectedIndex, setSelectedIndex] = useState<number|undefined>(undefined);
  const [hoveredIndex, setHoveredIndex] = useState<number|undefined>(undefined);

  const chartData = useMemo(() => {
    if(selectedIndex !==undefined && reports !== undefined){
      const productName = Object.keys(reports)[selectedIndex]
      const labels = Object.keys(reports[productName]).map((yyyymmdd) => dayjs(yyyymmdd).format("DD")) //日付の配列
      const dataset1 = Object.keys(reports[productName]).map((yyyymmdd) => reports[productName][yyyymmdd].count)
      const dataset2 = Object.keys(reports[productName]).map((yyyymmdd) => reports[productName][yyyymmdd].subtotal)
      return {
        title: productName,
        labels,
        dataset1: {
          name: "件数",
          data: dataset1
        },
        dataset2: {
          name: "金額",
          data: dataset2
        }
      }
    }
  },[reports, selectedIndex])

  const MultiChartMemorized = useMemo(() => chartData && <MultiLineChart {...chartData}/>,[chartData])

  const dailyTotal = useCallback((product_name: string) => {
    if(!reports){ return { totalCount: 0, totalSubtotal: 0}}
    const productDataArray = Object.keys(reports[product_name]).map((delivery_due_date, j) => (
      {
        count: reports[product_name][delivery_due_date].count,
        subtotal: reports[product_name][delivery_due_date].subtotal
      }
    ))
    const totalCount = productDataArray.reduce((prev, product) => {
      return prev + Number(product.count)
    }, 0)
    const totalSubtotal = productDataArray.reduce((prev, product) => {
      return prev + Number(product.subtotal)
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
               {reports && Object.keys(reports).map((product_name, i) => (
                <React.Fragment key={i}>
                    <tr
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(undefined)}
                      onClick={() => setSelectedIndex(i)}
                      className={`${hoveredIndex===i ? "hovered":""} ${selectedIndex===i ? "selected":""}`}
                    >
                      <th className="product_name" rowSpan={2}>
                      {product_name}
                      </th>
                      <th>件数</th>
                      <td className="total">
                      {dailyTotal(product_name).totalCount}
                      </td>
                      {Object.keys(reports[product_name]).map((delivery_due_date, j) => (
                        <td key={j}>{reports[product_name][delivery_due_date].count}</td>
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
                        {dailyTotal(product_name).totalSubtotal}
                      </td>
                      {Object.keys(reports[product_name]).map((delivery_due_date, j) => (
                        <td key={j}>{Number(reports[product_name][delivery_due_date].subtotal).toLocaleString('ja-JP')}</td>
                      ))}
                    </tr>
                  </React.Fragment>
              ))}
               </tbody>
            </table>
         </div>
      </div>
   </div>
     {MultiChartMemorized}
</div>
  </>)
}

export default Reports