import { FC } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';
import { CartProduct } from '../UI/cart-porduct/CartProduct';


const toListExample=[
    {
        "productId":1,
        "img":"img 1",
        "productName":"productName 1",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":2,
        "img":"img 2",
        "productName":"productName 2",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":3,
        "img":"img 3",
        "productName":"productName 3",
        "stock":4,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":4,
        "img":"img 4",
        "productName":"productName 4",
        "stock":1,
        "weist":"L",
        "price":{salePrice:1312}
      },
  ]

const toListExampleCart=[
    {
        "productId":1,
        "img":"img 1",
        "productName":"productName 1",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":2,
        "img":"img 2",
        "productName":"productName 2",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":3,
        "img":"img 3",
        "productName":"productName 3",
        "stock":4,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":4,
        "img":"img 4",
        "productName":"productName 4",
        "stock":1,
        "weist":"L",
        "price":{salePrice:1312}
      },
  ]

interface ICart{
   items:IProduct[] 
}

/*
<table style={{ borderCollapse: 'collapse', width: '100%' }} className={styles.cartTable}>
                <thead className={styles.cartTableTitles}>
                    <tr>
                        <th>image</th>
                        <th>title</th>
                        <th>amount</th>
                        <th>price</th>
                    </tr>
                </thead>
                {
                    toListExampleCart.map(element=>(
                    <>
                        <thead>
                            <tr>
                                <th>{element.img}</th>
                                <th>{element.productName}</th>
                                <th>{element.stock}</th>
                                <th>{element.price}</th>
                            </tr>
                        </thead>
                    </>))
                }
            </table>
*/

export const Cart:FC<ICart> = ({items}) => {
  return (
    <div className={styles.cartMainContainer}>
      <NavBar/>
      <h1 style={{marginLeft:"1rem"}}>Your Cart</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartViewProducts}>
            {
              toListExampleCart.map(product=>(
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
      <Carousel toList={toListExample}/>
      <Footer/>
    </div>
  )
}