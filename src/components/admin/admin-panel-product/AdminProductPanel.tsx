import { FC } from 'react';
import { Footer } from '../../UI/footer/Footer';
import { NavBar } from '../../UI/navbar/NavBar';
import style from './adminProductPanel.module.css';
import { AdminProductPanelCard } from './adminProductPanelCard/AdminProductPanelCard';
import { IoMdEye } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';

const toListExample=[
    {
        "productId":1,
        "img":"img 1",
        "state":true,
        "productName":"productName 1",
        "productType":"asdw",
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":2,
        "img":"img 2",
        "state":true,
        "productName":"productName 2",
        "productType":"asdw",
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":3,
        "img":"img 3",
        "state":false,
        "productName":"productName 3",
        "productType":"asdw",
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":4,
        "img":"img 4",
        "state":false,
        "productName":"productName 4",
        "productType":"asdw",
        "weist":"L",
        "price":{salePrice:1312}
      },
  ]

interface IAdminProductPanle{
    
}

export const AdminProductPanel:FC<IAdminProductPanle> = () => {
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
            {toListExample.map((product) => (
             <AdminProductPanelCard product={product} key={product.productId}/> 
            ))}
        </thead>
      </table>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminProductPanel
