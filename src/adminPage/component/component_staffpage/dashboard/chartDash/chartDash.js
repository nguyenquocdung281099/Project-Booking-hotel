import './style.css'
import { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { getBookingDB } from '../../../../../redux/action/'


export default function ChartDash() {

    const bookingData = useSelector((state) => state.bookingDB)
    const [barData, setBarData] = useState({});
    const [barOptions, setBarOptions] = useState({});
    
    return (
        <div>
            <Bar
            // data={chartData}
            // options={options.options} 
            />
        </div>
    )
}