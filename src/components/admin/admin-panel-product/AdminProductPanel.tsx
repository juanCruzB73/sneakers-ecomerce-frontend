import { FC } from 'react';
import { Footer } from '../../UI/footer/Footer';
import { NavBar } from '../../UI/navbar/NavBar';
import style from './adminProductPanel.module.css';
import { AdminProductPanelCard } from './adminProductPanelCard/AdminProductPanelCard';
import { IoMdEye } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { IProduct } from '../../../types/IProduct';
import { CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';



interface IAdminProductPanle{
    
}

export const AdminProductPanel:FC<IAdminProductPanle> = () => {

  const {products} = useSelector((state:RootState)=>state.product);
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);


  const navigate=useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handlePopUp=()=>{
    dispatch(onHandlePopUp({popUpType:"product",statusPopUp:!statusPopUp}))
  }
  
  return (
    <div className={style.adminPanelProductMainContainer}>
      <NavBar/>
      <div className={style.adminPanelProductContainer}>
        <h1>Pruduct Administration</h1>
        <table className="table-auto w-full border border-gray-300">
            <thead className={style.adminProductPanelTable}>
                <tr className={style.adminProductPanelTableTitles}>
                    <th className={style.adminProductPanelTableField}>Name</th>
                    <th className={style.adminProductPanelTableField}>Product Type</th>
                    <th className={style.adminProductPanelTableField}>Price</th>
                    <th className={style.adminProductPanelTableField}>State</th>
                    <th className={style.adminProductPanelTableField}>Actions</th>
                </tr>
            {products.map((product:IProduct) => (
             <AdminProductPanelCard product={product} key={product.productId}/> 
            ))}
        </thead>
      </table>
      </div>
      <div className={style.adminPanelProductContainerButtons}>
        <button onClick={()=>handlePopUp()}>Add Product <CiSquarePlus /></button>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminProductPanel
