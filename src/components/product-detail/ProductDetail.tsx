import { useEffect, useState } from 'react';
import style from './productDetail.module.css';
import { NavBar } from '../UI/navbar/NavBar';
import { Footer } from '../UI/footer/Footer';
import imgtest from '../../assets/man_shoes.jpg';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { onHandlePopUp } from '../../store/slices/modals-states/modalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { startSelectActiveProduct } from '../../store/slices/product/productThunk';
import { onAddCartProduct } from '../../store/slices/cart/cartSlice';

export const ProductDetail = () => {

  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const {activeProduct} = useSelector((state:RootState)=>state.product);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedAmount, setSelectedAmount] = useState("1");

  const dispatch = useDispatch<AppDispatch>();

  const handlePopUpProduct=()=>{
      dispatch(onHandlePopUp({popUpType:"product",statusPopUp:!statusPopUp}))
  }

  const { id } = useParams();

  useEffect(()=>{
    const getProduct=async()=>{
      dispatch(await startSelectActiveProduct(id!));
    }
    getProduct()
  },[id])

  if (!activeProduct) {
    return <div>Loading product details...</div>;
  }
  const handleAddToCart = () => {
    dispatch(onAddCartProduct({...activeProduct,weist:selectedSize,price:activeProduct.price.salePrice,selectedAmount:selectedAmount}))
  };

  return (
    <div className={style.ProductDetailMainContainer}>
      <NavBar/>
      <div className={style.productDetailContainer}>
        <div className={style.productDetailInfoContainer}>
          <h1>{activeProduct.productName}</h1>
          <h3 style={{color:"rgb(102, 102, 102)"}}>{activeProduct.productCategory}</h3>
          <h3>Color: {activeProduct.color}</h3>
          <h3>Category: {activeProduct.productType}</h3>
          <h3>Product Type: {activeProduct.productSubType}</h3>
          <h3>$ {activeProduct.price.salePrice}</h3>
          <div className={style.productDetailImgContainer}><img src={activeProduct.imgs[0].imgUrl} alt={activeProduct.imgs[0].imgUrl} /></div>
          <div className={style.productDetailButtons}>
            <h3 style={{color:"rgb(102, 102, 102)"}}>{activeProduct.description}</h3>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
        <div className={style.ProductDetailWeists}>
          <h1>Weists</h1>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
          </select>
          <h1>Amount</h1>
          <select value={selectedAmount} onChange={(e) => setSelectedAmount(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
