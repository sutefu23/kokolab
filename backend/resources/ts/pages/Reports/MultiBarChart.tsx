import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type ChartProps = {
  title: string,
  labels: string[],
  dataset1: {
    name: string,
    data: number[]
  },
  dataset2:{
    name: string,
    data: number[]
  },
  dataset3?: {
    name: string,
    data: number[]
  },
  dataset4?:{
    name: string,
    data: number[]
  }
}

const MultiLineChart = ({title, labels, dataset1, dataset2, dataset3, dataset4}:ChartProps):JSX.Element => {
  const options = useMemo(() => {
    return {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
      maintainAspectRatio: false,
      scales: {
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
        y2: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
        y3: {
          type: 'linear' as const,
          display: Boolean(dataset3),
          position: 'left' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
        y4: {
          type: 'linear' as const,
          display: Boolean(dataset4),
          position: 'right' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };
  },[dataset3, dataset4, title])
  
  const dataSets = [
      {
        label: dataset1.name,
        data: dataset1.data,
        borderColor: "rgb(75, 192, 192)",
        yAxisID: 'y1',
      },
      {
        label: dataset2.name,
        data: dataset2.data,
        borderColor: "rgb(75, 100, 192)",
        yAxisID: 'y2',
      },
      (dataset3)? {
        label: dataset3.name,
        data: dataset3.data,
        borderColor: "rgba(75, 192, 192, 0.4)",
        yAxisID: 'y3',
      }: undefined,
      (dataset4)? {
        label: dataset4.name,
        data: dataset4.data,
        borderColor: "rgba(75, 100, 192, 0.4)",
        yAxisID: 'y4',
      }: undefined,
    ]

  
  const graphData = {
    labels: labels,
    datasets: dataSets.filter((data):data is NonNullable<typeof data> => data !== undefined),
  };


  const divStyle: React.CSSProperties = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  };

  return (
    <div className="chart" style={divStyle}>
      <Line
        height={300}
        width={300}
        data={graphData}
        options={options}
        id="chart-key"
      />
    </div>
  )
}

export default MultiLineChart