import { useSelector } from 'react-redux';
import { Footer } from '../../UI/footer/Footer';
import { NavBar } from '../../UI/navbar/NavBar';
import style from './adminUserPanel.module.css';
import { AdminUserPanelCard } from './adminUserPanelCard/AdminUserPanelCard';

export const AdminUserPanel = () => {
  const {users} = useSelector((state:RootState)=>state.user);
  return (
    <div className={style.adminPanelUserMainContainer}>
      <NavBar/>
      <div className={style.adminPanelUserContainer}>
        <h1>Users panel</h1>
        <div className={style.adminPanelUserContainerUsersContainer}>
          {
            users.map(user=>(
              <AdminUserPanelCard user={user}/>
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}