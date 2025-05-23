import { Footer } from '../../UI/footer/Footer';
import { NavBar } from '../../UI/navbar/NavBar';
import style from './adminUserPanel.module.css';
import { AdminUserPanelCard } from './adminUserPanelCard/AdminUserPanelCard';

const userList=[
  {
    username:"user1"
  },
  {
    username:"user2"
  },
  {
    username:"user3"
  },
  {
    username:"user4"
  },
  {
    username:"user1"
  },
  {
    username:"user2"
  },
  {
    username:"user3"
  },
  {
    username:"user4"
  },
]

export const AdminUserPanel = () => {

  return (
    <div className={style.adminPanelUserMainContainer}>
      <NavBar/>
      <div className={style.adminPanelUserContainer}>
        <h1>Users panel</h1>
        <div className={style.adminPanelUserContainerUsersContainer}>
          {
            userList.map(user=>(
              <AdminUserPanelCard user={user}/>
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}