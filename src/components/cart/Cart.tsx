import { FC } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';


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
        "image":"image 1",
        "title":"title 1",
        "cantidad":2,
        "price":1312
      },
      {
        "image":"image 2",
        "title":"title 2",
        "cantidad":2,
        "price":4354
      },
      {
        "image":"image 3",
        "title":"title 3",
        "cantidad":4,
        "price":76786
      },
      {
        "image":"image 4",
        "title":"title 4",
        "cantidad":1,
        "price":9380
      },
  ]

interface ICart{
   items:IProduct[] 
}

export const Cart:FC<ICart> = ({items}) => {
  return (
    <div className={styles.cartMainContainer}>
      <NavBar/>
      <div className={styles.cartContainer}>
        <div className={styles.cartViewProducts}>
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
                                <th>{element.image}</th>
                                <th>{element.title}</th>
                                <th>{element.cantidad}</th>
                                <th>{element.price}</th>
                            </tr>
                        </thead>
                    </>))
                }
            </table>
        </div>
        <div className={styles.cartPaymentInformation}>
            <div className={styles.cartInformation}>
                <h1>Payment Information</h1>
                <h3>asdw</h3>
                <h3>asdw</h3>
                <h3>asdw</h3>
                <h3>asdw</h3>
            </div>
        </div>
      </div>
      <h2>Continue buying</h2>
      <Carousel toList={toListExample}/>
      <Footer/>
    </div>
  )
}