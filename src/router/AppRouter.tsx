import { Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { Cart } from "../components/cart/Cart"
import { CatalogProduct } from "../components/catalog-products/CatalogProduct"
import { ProductDetail } from "../components/product-detail/ProductDetail"
import { AdminUserPanel } from "../components/admin/admin-panel-user/AdminUserPanel"
import AdminProductPanel from "../components/admin/admin-panel-product/AdminProductPanel"
import { useSelector } from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"
import { ProductModal } from "../components/modals/product-modal/ProductModal"

export const AppRouter = () => {

  const {cartProducts} = useSelector((state:RootState)=>state.cart);
  const {user} = useSelector((state:RootState)=>state.auth);


  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart items={cartProducts}/>}/>
        <Route path="/filters/:sex/:category" element={<CatalogProduct/>}/>
        <Route path="/detailProduct/:id" element={<ProductDetail/>}/>
        <Route path="/admin/userpanel" element={user.userType?<AdminUserPanel/>:<Home/>}/>
        <Route path="/admin/productpanel" element={user.userType?<AdminProductPanel/>:<Home/>}/>
    </Routes>
  )
}
