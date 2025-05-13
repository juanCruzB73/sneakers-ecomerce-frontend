import { FC } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';
import { CartProduct } from '../UI/cart-porduct/CartProduct';


const toListExample=[
    {
      "image":"image 1",
      "title":"title 1",
      "description":"description 1",
      "price":1312
    },
    {
      "image":"image 2",
      "title":"title 2",
      "description":"description 2",
      "price":4354
    },
    {
      "image":"image 3",
      "title":"title 3",
      "description":"description 3",
      "price":76786
    },
    {
      "image":"image 4",
      "title":"title 4",
      "description":"description 4",
      "price":9380
    },
    {
      "image":"image 5",
      "title":"title 5",
      "description":"description 5",
      "price":792730
    },
  ]

const toListExampleCart=[
    {
        "img":"img 1",
        "productName":"productName 1",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "img":"img 2",
        "productName":"productName 2",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "img":"img 3",
        "productName":"productName 3",
        "stock":4,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
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
      <h1>Your Cart</h1>
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
      <h2>Continue buying</h2>
      <Carousel toList={toListExample}/>
      <Footer/>
    </div>
  )
}