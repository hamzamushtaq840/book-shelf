import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function Bookdetail() {
    const location = useLocation()
    console.log(location.state);
    return (
        <>
            <Navbar />
            Bookdetail</>
    )
}

export default Bookdetail