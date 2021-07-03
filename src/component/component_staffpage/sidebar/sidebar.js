import './style.css'

export default function Sidebar() {
    let sidebarData = [
        {
            icon: "fas fa-tachometer-alt",
            name: "Dashboard"
        },
        {
            icon: "fas fa-suitcase",
            name: "List Booking"
        },
        {
            icon: "fas fa-ticket-alt",
            name: "List Promotions"
        },
        {
            icon: "fas fa-plus-circle",
            name: "Add Promotion"
        },
        {
            icon: "fas fa-bed",
            name: "List Rooms"
        },

        {
            icon: "fas fa-wrench",
            name: "List Services"
        },
        {
            icon: "fas fa-users",
            name: "List Users"
        },
        {
            icon: "fas fa-user-plus",
            name: "Add User"
        },
        {
            icon: "fas fa-users-cog",
            name: "Configure User"
        }
    ]
    let sideList = sidebarData.map((item, index) => {
        return (
            <li key={index} className="nav-item">
                <a className="nav-link" href="#">
                    <i className={item.icon} aria-hidden="true"></i>
                    {item.name}
                </a>
            </li>
        )
    })

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                    {sideList}
                </ul>

                {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                   
                </ul> */}
            </div>
        </nav>
    )
}