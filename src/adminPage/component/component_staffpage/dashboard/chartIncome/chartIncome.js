import './style.css'
import { Bar } from "react-chartjs-2"


export default function ChartIncome(props) {
    const { labels, datasets } = props

    let dataChart = {
        labels: labels,
        datasets: datasets
    }
    const chartOptions = {
        responsive: true,
        title: { 
            text: "Income from last 6 month and current month", 
            display: true },
        scales: {
            yAxes: {
                ticks: {
                    beginAtZero: true,
                    callback: (label) => `$ ${label}`,
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        }
    }

    return (
        <div className='card barchart'>
            <div className="card-header">
                Income from current month and last 6 months
            </div>
            <Bar
                data={dataChart}
                options={chartOptions}
            // width={1400}
            // height={900}
            />
        </div>
    )
}