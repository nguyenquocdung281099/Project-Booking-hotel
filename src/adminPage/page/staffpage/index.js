import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../component/component_staffpage/header/header';
import Sidebar from '../../component/component_staffpage/sidebar/sidebar';
import StaffWrapper from '../../component/component_staffpage/staffWrapper';

import { KEY_TOKEN } from "../../const/const"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, getUserDB, logout } from "../../../redux/action";
import jwt_decode from "jwt-decode";


export default function StaffPage() {

    const dispatch = useDispatch();

    const token = localStorage.getItem(KEY_TOKEN);
    let listUser = useSelector((state) => state.userDB.userDB);
    let emailUser = { email: "" };
    if (token !== null) emailUser = jwt_decode(token);

    useEffect(() => {
        dispatch(getuser(`users?email=${emailUser.email}`));
        dispatch(getUserDB())
        // eslint-disable-next-line
    }, [])

    const lData = listUser.find(e => e.email === emailUser.email)
    
    return (
        <div className='mainstaff-wrapper'>
            <Header />
            <Sidebar {...lData} />
            <StaffWrapper {...lData}/>
        </div>
    )
}