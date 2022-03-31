import React, { useState, useCallback, useEffect,useMemo } from "react";
import dayjs from "dayjs";
import { useGetMonthlyReport} from '../../hooks/order';
import './Reports.css';
import MultiLineChart from './Chart'
import type { ChartProps } from "./Chart";
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
      const labels = Object.keys(reports[productName]).map((yyyymmdd) => new Date(yyyymmdd).getDay().toString()) //日付の配列
      const dataset1 = Object.keys(reports[productName]).map((yyyymmdd) => reports[productName][yyyymmdd].quantity)
      const dataset2 = Object.keys(reports[productName]).map((yyyymmdd) => reports[productName][yyyymmdd].subtotal)
      return {
        title: productName,
        labels,
        dataset1: {
          name: "個数",
          data: dataset1
        },
        dataset2: {
          name: "金額",
          data: dataset2
        }
      }
    }
  },[reports, selectedIndex])


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
                  {i % 2 === 0?
                    <tr
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(undefined)}
                      onClick={() => setSelectedIndex(i)}
                      className={`${hoveredIndex===i ? "hovered":""} ${selectedIndex===i ? "selected":""}`}
                    >
                        <th className="product_name" rowSpan={2}>
                        {product_name}
                        </th>
                        <th>個数</th>
                        {Object.keys(reports[product_name]).map((delivery_due_date, j) => (
                          <td key={j}>{reports[product_name][delivery_due_date].quantity}</td>
                        ))}
                        </tr>
                      :
                    <tr
                      onMouseEnter={() => setHoveredIndex(i-1)}
                      onMouseLeave={() => setHoveredIndex(undefined)}
                      className={`${(hoveredIndex != undefined) && (hoveredIndex + 1)===i ? "hovered":""} ${(selectedIndex != undefined) && (selectedIndex + 1)===i ? "selected":""}`}
                    >
                      <th>金額</th>
                      {Object.keys(reports[product_name]).map((delivery_due_date, j) => (
                        <td key={j}>{Number(reports[product_name][delivery_due_date].subtotal).toLocaleString('ja-JP')}</td>
                      ))}
                    </tr>
                  }
                  </React.Fragment>
              ))}
               </tbody>
            </table>
         </div>
      </div>
   </div>
     {chartData &&
       <MultiLineChart {...chartData}/>
     }
</div>
  </>)
}

export default Reports