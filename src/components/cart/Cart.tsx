import { FC, useEffect, useState } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';
import { CartProduct } from '../UI/cart-porduct/CartProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { ICartPorduct } from '../../store/slices/cart/cartSlice';
import { startGetUserById } from '../../store/slices/user/userThunk';
import { IAdress } from '../../types/IAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { onHandlePopUp } from '../../store/slices/modals-states/modalSlice';



export const Cart = () => {
  const {cartProducts} = useSelector((state:RootState)=>state.cart);
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const {products} = useSelector((state:RootState)=>state.product);
  const {addresses} = useSelector((state:RootState)=>state.address);

  const dispatch = useDispatch<AppDispatch>();
  
  const totalPrice = cartProducts.reduce((acc:number, product:ICartPorduct) => {
    const price = Number(product.price);
    const quantity = (product as any).quantity || 1;
    return acc + price * quantity;
  }, 0);

  const handlePopUp=()=>{
    dispatch(onHandlePopUp({popUpType:"adddress",statusPopUp:!statusPopUp}))
  }

  if(!addresses.length){
    return <div>Loading cart details...</div>;
  }

  return (
    <div className={styles.cartMainContainer}>
      <NavBar/>
      <h1 style={{marginLeft:"1rem"}}>Your Cart</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartViewProducts}>
            {
              cartProducts.map((product:ICartPorduct)=>(
                <CartProduct product={product}/>
              ))
            }
        </div>
        <div className={styles.cartPaymentInformation}>
            <div className={styles.cartInformation}>
              <div><h1>Payment Information</h1></div>
              <h3>Number of products: {cartProducts.length}</h3>
              <h3>Delivery: 
                <select name="" id="">
                {
                addresses.map((address:IAdress)=>(
                  <option value="">{address.street} {address.streetNumber}</option>
                ))
                }
                </select>
                <button onClick={handlePopUp}>Add address</button>
              </h3>
              <h3>Total: ${totalPrice}</h3>
              <button style={{marginLeft:"15px"}}>Finish Payment</button>
            </div>
        </div>
      </div>
      <h2 style={{marginLeft:"1rem"}}>Continue buying</h2>
      <Carousel products={products}/>
      <Footer/>
    </div>
  )
}