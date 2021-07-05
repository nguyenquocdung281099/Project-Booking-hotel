import './style.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to='/dashboard' className="navbar-brand col-md-3 col-lg-2 mr-0 px-3">
            Staff Page </Link>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                    <Link to='/dashboard' className="nav-link">
                    Sign out </Link>
                    </li>
                </ul>
        </nav>
    )
}