import { useSelector } from 'react-redux';
import style from './loginModal.module.css';
import { RootState } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';

export const LoginModal = () => {

  const {statusPopUp,popUpType,actionPopUp} = useSelector((state:RootState)=>state.popUp);
  const [modalOption,setModalOption]=useState("login");

  const dispatch = useDispatch<AppDispatch>();
  
  const handlePopUpLogin=()=>{
    dispatch(onHandlePopUp({popUpType:"login",statusPopUp:!statusPopUp}))
  }

  return (
    <div className={style.loginModalMainContainer}>
        <div className={style.loginModalContainer}>
            <div className={style.loginModalOptionModal}>
              <h2 style={modalOption==="login"?{color:"black"}:{color:"rgb(119, 119, 119)"}} onClick={()=>setModalOption("login")}>Login</h2>
              <h2 style={modalOption==="sing up"?{color:"black"}:{color:"rgb(119, 119, 119)"}} onClick={()=>setModalOption("sing up")}>Sing up</h2></div>
            <div className={modalOption==="login"?style.loginModalInputsContainer:style.singupModalInputContainer}>
              {
              modalOption==="login"?(
              <>
                <input type="text" name="" placeholder='username' />
                <input type="text" placeholder='password' />
              </>):(<>
                <input type="text" name="" placeholder='name' />
                <input type="text" name="" placeholder='lastname' />
                <input type="text" name="" placeholder='username' />
                <input type="text" name="" placeholder='email' />
                <input type="text" placeholder='password' />
                <input type="text" placeholder='confirmPassword' />
              </>)
          }
                <div className={style.loginModalButtons}>
                  <button type="button" onClick={handlePopUpLogin}>Cancel</button>
                  <button type="submit" onClick={handlePopUpLogin}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
