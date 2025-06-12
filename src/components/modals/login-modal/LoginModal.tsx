import { useSelector } from 'react-redux';
import style from './loginModal.module.css';
import { RootState } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import { useForm } from '../../../hooks/useForm';
import { startLogin, startRegister } from '../../../store/slices/auth/authThunk';
import { onLogOut } from '../../../store/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { startGetUserById, startUpdateUser } from '../../../store/slices/user/userThunk';
import { IUser } from '../../../types/IUser';
import { FaUsers } from 'react-icons/fa6';
import { AiOutlineProduct } from 'react-icons/ai';

interface ILogin{
  username:string;
  password:string;
  name:string;
  lastname:string;
  confirmPassword:string;
  dni:number;
  email:string;
}

const loginInitialState={
  username:"",
  password:"",
  name:"",
  lastname:"",
  confirmPassword:"",
  dni:"",
  email:""
}

export const LoginModal = () => {

    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
    const {status,user} = useSelector((state:RootState)=>state.auth);
  
    const [modalOption,setModalOption]=useState("login");
    const [userInfo,setUserInfo]=useState<IUser>({
      username:"",
      name:"",
      lastname:"",
      dni:0,
      email:"",
      userType:"",
      active:true,
      adresses:[]
    });
  
    const dispatch = useDispatch<AppDispatch>();
  
    const navigate=useNavigate();
    
    const {name,lastname,dni,email,username,password,confirmPassword,onInputChange,onResetForm}=useForm<ILogin>(loginInitialState);

    const handlePopUpLogin=()=>{
      dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
    };

  const onHandleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (modalOption === "login") {
      dispatch(await startLogin({ username, password }));
      dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
    }else{
      dispatch(await startRegister({name,lastname,dni,email,username,password}));
      dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
    }
  };

  useEffect(()=>{
    const getUser=async()=>{
      if(user?.userId){
        const data=await startGetUserById(user.userId);
        if (data) setUserInfo(data);
      };
    }
    getUser();
  },[])
  
  const handleSubmitUser=async(e: React.FormEvent)=>{
    e.preventDefault();
    if(userInfo.userId){
      await dispatch(startUpdateUser({
      userId:userInfo.userId,
      username:userInfo.username,
      name:userInfo.name,
      lastname:userInfo.lastname,
      dni:userInfo.dni,
      email:userInfo.email,
    }))
    }
  }

  return (
  <div className={style.loginModalMainContainer}>
    <div className={style.loginModalContainer}>
      {
        status === "authenticated" ? (
          <>
            <form onSubmit={handleSubmitUser} className={style.loginModalInfoUserContainer}>
              <h2>User Info</h2>
              <input onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} value={userInfo.username}/>
              <input onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} value={userInfo.email}/>
              <input onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} value={userInfo.name}/>
              <input onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })} value={userInfo.lastname}/>
              <input onChange={(e) => setUserInfo({ ...userInfo, dni: e.target.value })} value={userInfo.dni}/>
              <button type='submit'>Save Changes</button>
            </form>
            <div className={style.loginModalButtonContainer}>
              <div className={style.loginModalProfileButtons}>
              <button type="button" onClick={() => { localStorage.removeItem("token"); dispatch(onLogOut()); }}>Log Out</button>
              <button type="button" onClick={handlePopUpLogin}>Close</button>
            </div>
            {
              user.userType === "admin" && (
                <div className={style.loginModalAdminProfileButtons}>
                  <button type="button" onClick={() => { navigate("/admin/productpanel"); handlePopUpLogin(); }}>Product Panel <AiOutlineProduct /></button>
                  <button type="button" onClick={() => { navigate("/admin/userpanel"); handlePopUpLogin(); }}>User Panel <FaUsers /></button>
                </div>
              )
            }
            </div>
            
          </>
        ) : (
          <form onSubmit={onHandleSubmit}>
            <div className={style.loginModalOptionModal}>
              <h2 style={modalOption === "login" ? { color: "black" } : { color: "rgb(119, 119, 119)" }} onClick={() => setModalOption("login")}>Login</h2>
              <h2 style={modalOption === "sing up" ? { color: "black" } : { color: "rgb(119, 119, 119)" }} onClick={() => setModalOption("sing up")}>Sing up</h2>
            </div>
            <div className={modalOption === "login" ? style.loginModalInputsContainer : style.singupModalInputContainer}>
              {
                modalOption === "login" ? (
                  <>
                    <input type="text" name="username" value={username} onChange={onInputChange} placeholder='username' />
                    <input type="password" name="password" value={password} onChange={onInputChange} placeholder='password' />
                  </>
                ) : (
                  <>
                    <input type="text" value={name} onChange={onInputChange} name="name" placeholder='name' />
                    <input type="text" value={lastname} onChange={onInputChange} name="lastname" placeholder='lastname' />
                    <input type="text" value={username} onChange={onInputChange} name="username" placeholder='username' />
                    <input type="text" value={dni} onChange={onInputChange} name="dni" placeholder='dni' />
                    <input type="text" value={email} onChange={onInputChange} name="email" placeholder='email' />
                    <input type="password" value={password} onChange={onInputChange} name="password" placeholder='password' />
                    <input type="password" value={confirmPassword} onChange={onInputChange} name="confirmPassword" placeholder='confirmPassword' />
                  </>
                )
              }
              <div className={style.loginModalButtons}>
                <button type="button" onClick={handlePopUpLogin}>Close</button>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        )
      }
    </div>
  </div>
);

}
