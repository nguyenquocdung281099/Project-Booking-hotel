import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../component/component_staffpage/header/header';
import Sidebar from '../../component/component_staffpage/sidebar/sidebar';
import StaffWrapper from '../../component/component_staffpage/staffWrapper';

export default function StaffPage() {
    return (
        <div className='mainstaff-wrapper'>
            <Header />
            <Sidebar />
            <StaffWrapper />
        </div>
    )
}