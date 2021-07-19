import './style.css'
import { Line } from "react-chartjs-2"


export default function ChartPeople(props) {
    const { labels, datasets } = props

    let dataChart = {
        labels: labels,
        datasets: datasets
    }
    const chartOptions = {
        responsive: true,
        title: {
            text: "Customer from last 6 month and current month",
            display: true
        },
        scales: {
            yAxes: {
                ticks: {
                    beginAtZero: true,
                    callback: (label) => `${label} p`,
                }
            }
        },
        legend: {
            display: false
        }
    }
    return (
        <div className='card linechart'>
            <div className="card-header">
                Amount of people use and cancel booking
            </div>
            <Line
                data={dataChart}
                options={chartOptions}
            />
        </div>
    )
}