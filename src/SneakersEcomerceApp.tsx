import { RootState } from '@reduxjs/toolkit/query';
import './App.css'
import { AppRouter } from './router/AppRouter'
import { useSelector } from 'react-redux';
import { LoginModal } from './components/modals/login-modal/LoginModal';
import { ProductModal } from './components/modals/product-modal/ProductModal';
import { useEffect } from 'react';
import { startGetProducts } from './store/slices/product/productThunk';
import { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';

export const SneakersEcomerceApp=()=> {
  const {statusPopUp,popUpType} = useSelector((state:RootState)=>state.popUp);
  const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    const getProducts=async()=>{
      dispatch(await startGetProducts());
    }
    getProducts();
  },[])
  return (
    <div className='aplcationContainer'>
      {(statusPopUp==true && popUpType==="login")?<LoginModal/>:<></>}
      {(statusPopUp==true && popUpType==="product")?<ProductModal/>:<></>}
      <AppRouter/>
    </div>
  )
}
