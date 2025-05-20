import { FC } from 'react';
import style from './productDetail.module.css';
import { NavBar } from '../UI/navbar/NavBar';
import { Footer } from '../UI/footer/Footer';
import { Wesits } from '../UI/weists/Wesits';
import imgtest from '../../assets/man_shoes.jpg';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { onHandlePopUp } from '../../store/slices/modals-states/modalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';


const product={
        "img":"img 4",
        "productName":"productName 4",
        "stock":1,
        "weist":"L",
        "productDescription":"asdwasdw description",
        "productCategory":"product category",
        "price":{salePrice:1312}
      }

export const ProductDetail = () => {
  const {statusPopUp,popUpType,actionPopUp} = useSelector((state:RootState)=>state.popUp);
  const dispatch = useDispatch<AppDispatch>();
  const handlePopUpProduct=()=>{
      dispatch(onHandlePopUp({popUpType:"product",statusPopUp:!statusPopUp}))
  }
  return (
    <div className={style.ProductDetailMainContainer}>
      <NavBar/>
      <div className={style.productDetailContainer}>
        <div className={style.productDetailInfoContainer}>
          <h1>{product.productName}</h1>
          <h3 style={{color:"rgb(102, 102, 102)"}}>{product.productCategory}</h3>
          <h3>{product.price.salePrice}</h3>
          <div className={style.productDetailImgContainer}><img src={imgtest} alt={imgtest} /></div>
          <div className={style.productDetailButtons}>
            <h3 style={{color:"rgb(102, 102, 102)"}}>{product.productDescription}</h3>
            <button>Add to cart</button>
            <button onClick={handlePopUpProduct}>Edit</button>
          </div>
        </div>
        <div className={style.ProductDetailWeists}>
          <h1>Weists</h1>
          <select name="" id="">
            <option value="">XL</option>
            <option value="">S</option>
            <option value="">M</option>
            <option value="">S</option>
          </select>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
