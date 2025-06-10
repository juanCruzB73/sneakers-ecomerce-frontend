import { useSelector } from 'react-redux';
import style from './loginModal.module.css';
import { RootState } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import { useForm } from '../../../hooks/useForm';
import { startLogin } from '../../../store/slices/auth/authThunk';

interface ILogin{
  username:string;
  password:string;
}

const loginInitialState={
  username:"",
  password:""
}

export const LoginModal = () => {

  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const [modalOption,setModalOption]=useState("login");

  const dispatch = useDispatch<AppDispatch>();

  const {username,password,onInputChange,onResetForm}=useForm<ILogin>(loginInitialState);
  
  const handlePopUpLogin=()=>{
    dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
  }

  const onHandleSubmit = async(e: React.FormEvent) => {
  e.preventDefault();
  console.log("asdw")
  if (modalOption === "login") {
    dispatch(await startLogin({ username, password }));
    dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
  }
};

  return (
    <form onSubmit={onHandleSubmit} className={style.loginModalMainContainer}>
        <div  className={style.loginModalContainer}>
            <div className={style.loginModalOptionModal}>
              <h2 style={modalOption==="login"?{color:"black"}:{color:"rgb(119, 119, 119)"}} onClick={()=>setModalOption("login")}>Login</h2>
              <h2 style={modalOption==="sing up"?{color:"black"}:{color:"rgb(119, 119, 119)"}} onClick={()=>setModalOption("sing up")}>Sing up</h2></div>
            <div className={modalOption==="login"?style.loginModalInputsContainer:style.singupModalInputContainer}>
              {
              modalOption==="login"?(
              <>
                <input type="text" name="username" value={username} onChange={onInputChange} placeholder='username' />
                <input type="password" name="password" value={password} onChange={onInputChange} placeholder='password' />
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
                  <button type="submit">Submit</button>
                </div>
            </div>
        </div>
    </form>
  )
}
