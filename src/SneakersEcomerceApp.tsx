import { RootState } from '@reduxjs/toolkit/query';
import './App.css'
import { AppRouter } from './router/AppRouter'
import { useSelector } from 'react-redux';
import { LoginModal } from './components/modals/login-modal/LoginModal';
import { ProductModal } from './components/modals/product-modal/ProductModal';
import { useEffect } from 'react';
import { startGetActiveProducts, startGetProducts } from './store/slices/product/productThunk';
import { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';
import { decodeJWT } from './helpers/jwt';
import { onLogin } from './store/slices/auth/authSlice';
import { startGetUsers } from './store/slices/user/userThunk';

export const SneakersEcomerceApp=()=> {

  const {statusPopUp,popUpType} = useSelector((state:RootState)=>state.popUp);
  const {products} = useSelector((state:RootState)=>state.product);
  const {user} = useSelector((state:RootState)=>state.auth);
  const dispatch=useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    const getProducts=async()=>{
      dispatch(await startGetProducts());
    }
    getProducts();
  },[])

  useEffect(()=>{
    const getProducts=async()=>{
      dispatch(await startGetActiveProducts())
    }
    getProducts();
  },[products])
  
  useEffect(()=>{
    if (token) {
        const payload = decodeJWT(token);
        if (payload) {
          dispatch(onLogin({username:payload.sub,email:payload.email,userId:payload.userId,userType:payload.userType}));
        }
        
    }
  },[token])

  useEffect(() => {
  const loadUsers = async () => {
    if (user.userType === "admin") {
      dispatch(await startGetUsers());
    }
  };
  loadUsers();
}, [user.userType]);

  return (
    <div className='aplcationContainer'>
      {(statusPopUp==true && popUpType==="login")?<LoginModal/>:<></>}
      {(statusPopUp==true && popUpType==="product")?<ProductModal/>:<></>}
      <AppRouter/>
    </div>
  )
}
