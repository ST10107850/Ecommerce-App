import Barner from "../components/Barner";
import { Category } from "../components/Category";
import { Details } from "../components/Details";

import { NewArrivals } from "../components/NewArrivals";
import { Product } from "../components/Product"
import { useProduct } from "../hooks/useProduct";

export const HomePage = () => {
  const { products } = useProduct();

  return (
    <>
      
      <Barner />
      <Category />
      <Product isHome={true} products={products} />
      <NewArrivals />
      <Details />
    
    </>
  );
};
