import { Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { Cart } from "../components/cart/Cart"
import { useEffect, useState } from "react"
import { startGetProducts } from "../store/slices/product/productThunk"
import { IProduct } from "../types/IProduct"
import { CatalogProduct } from "../components/catalog-products/CatalogProduct"
import { ProductDetail } from "../components/product-detail/ProductDetail"

export const AppRouter = () => {

  const [products,setProducts]=useState<IProduct[]>([]);
  

  useEffect(()=>{
    const test=async()=>{
      const data=await startGetProducts();
      setProducts(data);
      console.log(products)
    } 
    test();
  },[])

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart items={products}/>}/>
        <Route path="/catalog" element={<CatalogProduct/>}/>
        <Route path="/detailProduct/:id" element={<ProductDetail/>}/>
    </Routes>
  )
}
