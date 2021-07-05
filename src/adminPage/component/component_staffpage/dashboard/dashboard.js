import './style.css'
import { useState } from 'react'

import TableDashboard from './tableDashboard/tableDashboard'

export default function Dashboard() {
    let booking = {
        name: 'Booking',
        link: '/operation/list_bookings',
        db:
            [{
                id: "1",
                idroom: "12",
                userID: "13",
                starttime: "",
                endtime: "",
                status: "NEW",
            },
            {
                id: "2",
                idroom: "21",
                userID: "23",
                starttime: "",
                endtime: "",
                status: "NEW",
            },
            {
                id: "3",
                idroom: "33",
                userID: "34",
                starttime: "",
                endtime: "",
                status: "NEW",
            }
            ]
    }

    let roomType = {
        name: 'Room Type',
        link: '/setup/list_rooms',
        db:
            [{
                id: 1,
                name: "classic room",
                size: 50,
                pricePerday: 100
            },
            {
                id: 2,
                name: "budget room",
                size: 50,
                pricePerday: 120
            },
            {
                id: 3,
                name: "single room",
                size: 50,
                pricePerday: 150
            },
            {
                id: 4,
                name: "royal suite room",
                size: 100,
                pricePerday: 200
            },
            {
                id: 5,
                name: "luxury room",
                size: 100,
                pricePerday: 300
            },
            {
                id: 6,
                name: "premium room",
                size: 100,
                pricePerday: 350
            }]
    }

    let promotion = {
        name: 'Promotion',
        link: '/setup/list_promos',
        db:
            [{
                id: 1,
                name: "giảm giá mùa hè",
                discount: 5,
                startTime: "2021/04/30",
                endTime: "2021/05/30"
            },
            {
                id: 2,
                name: "giảm giá ngày kỉ niệm khách sạn ",
                discount: 10,
                startTime: "2021/09/30",
                endTime: "2021/10/15"
            }
            ]
    }
    let service = {
        name: 'Service',
        link: '/setup/list_services',
        db: [
            {
                "name": "Dịch vụ Spa",
                "id": 1,
                "price": 50
            },
            {
                "name": "Dịch vụ phòng họp",
                "id": 2,
                "price": 70
            },
            {
                "name": "Fitness centre",
                "id": 3,
                "price": 50
            },
            {
                "name": "Dịch vụ phòng 24/24",
                "id": 4,
                "price": 50
            }]
    }

    return (
        <div>
            <div class="row">
                <TableDashboard
                    name={booking.name}
                    link={booking.link}
                    db={booking.db} />
                <TableDashboard
                    name={roomType.name}
                    link={roomType.link}
                    db={roomType.db} />
            </div>
            <div class="row">
                <TableDashboard
                    name={promotion.name}
                    link={promotion.link}
                    db={promotion.db} />
                <TableDashboard
                    name={service.name}
                    link={service.link}
                    db={service.db} />
            </div>
        </div>
    )
}