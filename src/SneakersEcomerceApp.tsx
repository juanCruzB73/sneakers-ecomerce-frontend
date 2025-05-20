import { RootState } from '@reduxjs/toolkit/query';
import './App.css'
import { AppRouter } from './router/AppRouter'
import { useSelector } from 'react-redux';
import { LoginModal } from './components/modals/login-modal/LoginModal';
import { ProductModal } from './components/modals/product-modal/ProductModal';

export const SneakersEcomerceApp=()=> {
  const {statusPopUp,popUpType,actionPopUp} = useSelector((state:RootState)=>state.popUp);
  return (
    <div className='aplcationContainer'>
      {(statusPopUp==true && popUpType==="login")?<LoginModal/>:<></>}
      {(statusPopUp==true && popUpType==="product")?<ProductModal/>:<></>}
      <AppRouter/>
    </div>
  )
}
