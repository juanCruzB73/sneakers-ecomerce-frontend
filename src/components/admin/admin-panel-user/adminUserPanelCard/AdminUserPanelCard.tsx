import { FC } from 'react';
import style from './adminUserPanelCard.module.css';
import { IoMdEye } from 'react-icons/io';
import { FaCheck, FaTrashCan } from 'react-icons/fa6';
import { IUser } from '../../../../types/IUser';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { startDeleteUser, startUpdateUser } from '../../../../store/slices/user/userThunk';
import { startUpdateProduct } from '../../../../store/slices/product/productThunk';

interface IAdminUserPanelCard{
    user:IUser;
}

export const AdminUserPanelCard:FC<IAdminUserPanelCard> = ({user}) => {

  const dispatch = useDispatch<AppDispatch>();

  const onHandleDelete=()=>{
      user.userId&&dispatch(startDeleteUser(user.userId));
      dispatch(startUpdateUser({userId:user.userId,active:false}));
    }
    
    const onHandleActivate=async()=>{
      dispatch(startUpdateUser({userId:user.userId,active:true}));
    }
    const onHandleMakeAdmin=async()=>{
      dispatch(startUpdateUser({userId:user.userId,userType:"admin"}));
    }
    const onHandleMakeUser=async()=>{
      dispatch(startUpdateUser({userId:user.userId,userType:"user"}));
    }

  return (
    <div className={style.adminUserPanelCardMainContainer}>
      <div className={style.adminPanelUserContainerTitleButtons}><h2>{user.username}</h2>{user.userType=="user"?<button onClick={onHandleMakeAdmin}>Make it admin</button>:<button onClick={onHandleMakeUser}>Make it user</button>}<div><IoMdEye /> {user.active?<FaTrashCan onClick={onHandleDelete}/>:<FaCheck onClick={onHandleActivate}/>}</div></div>
      
      <div className={style.adminUserPanelCardInfoContainer}>
        <h4>{user.userType}</h4>
        <h4>{user.email}</h4>
        <h4>{user.active?"active":"inactive"}</h4>
      </div >
    </div>
  )
}
