import React from 'react'
import Barner from '../components/Barner'
import { Category } from '../components/Category'
import { Product } from '../components/Product'
import { NewArrivals } from '../components/NewArrivals'
import { Details } from '../components/Details'
import { useProduct } from '../hooks/useProduct'

export const OtherPages = () => {
     const { products } = useProduct();
  return (
    <div>
        <Barner/>
        <Category/>
        <Product isHome={true} products={products}/>
        <NewArrivals/>
        <Details/>
        
    </div>
  )
}
