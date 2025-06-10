import { FC } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';
import { CartProduct } from '../UI/cart-porduct/CartProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';


interface ICart{
   items:IProduct[] 
}

export const Cart:FC<ICart> = ({items}) => {
  const {cartProducts} = useSelector((state:RootState)=>state.cart);
  const {products} = useSelector((state:RootState)=>state.product);

  
  return (
    <div className={styles.cartMainContainer}>
      <NavBar/>
      <h1 style={{marginLeft:"1rem"}}>Your Cart</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartViewProducts}>
            {
              cartProducts.map((product:IProduct)=>(
                <CartProduct product={product}/>
              ))
            }
        </div>
        <div className={styles.cartPaymentInformation}>
            <div className={styles.cartInformation}>
                <div><h1>Payment Information</h1></div>
                <h3>Number of products: </h3>
                <h3>Delivery:</h3>
                <h3>Total:</h3>
                <button>Finish Payment</button>
            </div>
        </div>
      </div>
      <h2 style={{marginLeft:"1rem"}}>Continue buying</h2>
      <Carousel products={products}/>
      <Footer/>
    </div>
  )
}