import { FC } from 'react';
import { IProduct } from '../../../../types/IProduct';
import style from './adminProductPanelCard.module.css';
import { FaCheck, FaTrashCan } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { onHandlePopUp } from '../../../../store/slices/modals-states/modalSlice';
import { onSelectActiveProduct } from '../../../../store/slices/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { startDeleteProduct, startUpdateProduct } from '../../../../store/slices/product/productThunk';



interface IAdminProductPanelCard{
    product:IProduct;
}

export const AdminProductPanelCard:FC<IAdminProductPanelCard> = ({product}) => {
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();

  const handlePopUp=()=>{
    dispatch(onSelectActiveProduct(product))
    dispatch(onHandlePopUp({popUpType:"product",statusPopUp:!statusPopUp}))
  }

  const onHandleDelete=()=>{
    product.productId&&dispatch(startDeleteProduct(product.productId));
    dispatch(startUpdateProduct({...product,img:[product.imgs[0].imgId],active:false,price:product.price.salePrice}));
  }
  
  const onHandleActivate=async()=>{
    dispatch(startUpdateProduct({...product,img:[product.imgs[0].imgId],active:true,price:product.price.salePrice}));
  }

  return (
    <>
        <tr key={product.productId}>
        <td className={style.adminProductPanelTableField} onClick={handlePopUp}>{product.productName}</td>
        <td className={style.adminProductPanelTableField}>{product.productType}</td>
        <td className={style.adminProductPanelTableField}>{product.price.salePrice?product.price.salePrice:0}</td>
        <td className={style.adminProductPanelTableField}>{product.active ? "activo" : "inactivo" }</td>
        <th className={style.adminProductPanelTableField}><IoMdEye onClick={()=>navigate(`/detailProduct/${product.productId}`)}/>{!product.active?<FaCheck onClick={onHandleActivate}/>:<FaTrashCan onClick={onHandleDelete}/>}</th>
     </tr>
    </>
  )
}
