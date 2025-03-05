import React from 'react'
import { TopHeader } from '../components/TopHeader'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'

export const UserLayout = () => {
  return (
   <div>
    <TopHeader/>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </div>
  )
}
