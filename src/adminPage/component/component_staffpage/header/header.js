import './style.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='staff_header'>
            <div className="staff_header-left">
                <Link to='/admin/dashboard'>
                  </Link>
            </div>
        </div>
    )
}