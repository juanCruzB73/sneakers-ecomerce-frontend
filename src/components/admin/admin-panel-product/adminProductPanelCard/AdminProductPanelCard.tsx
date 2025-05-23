import { FC } from 'react';
import { IProduct } from '../../../../types/IProduct';
import style from './adminProductPanelCard.module.css';
import { FaTrashCan } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';

interface asdw{
    productId:number,
    img:string,
    state:boolean,
    productName:string,
    productType:string,
    weist:string,
    price:{salePrice:number}
}

interface IAdminProductPanelCard{
    product:asdw;
}

export const AdminProductPanelCard:FC<IAdminProductPanelCard> = ({product}) => {
  return (
    <>
        <tr key={product.productId}>
        <td className={style.adminProductPanelTableField}>{product.productName}</td>
        <td className={style.adminProductPanelTableField}>{product.productType}</td>
        <td className={style.adminProductPanelTableField}>{product.price.salePrice}</td>
        <td className={style.adminProductPanelTableField}>{product.state ? "activo" : "inactivo" }</td>
        <th className={style.adminProductPanelTableField}><IoMdEye /><FaTrashCan /></th>
     </tr>
    </>
  )
}
