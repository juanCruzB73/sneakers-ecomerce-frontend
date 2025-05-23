import { FC } from 'react';
import style from './adminUserPanelCard.module.css';
import { IoMdEye } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';

interface IAdminUserPanelCard{
    user:{username:string};
}

export const AdminUserPanelCard:FC<IAdminUserPanelCard> = ({user}) => {
  return (
    <div className={style.adminUserPanelCardMainContainer}>
      <h2>{user.username}</h2>
      <div><IoMdEye /><FaTrashCan /></div>
    </div>
  )
}
