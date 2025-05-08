import { Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { Cart } from "../components/cart/Cart"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
    </Routes>
  )
}
