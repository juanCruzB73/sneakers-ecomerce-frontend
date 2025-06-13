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
import { IWeistStock } from '../../../../types/IWeistStock';



interface IAdminProductPanelCard{
    product:IProduct;
    stockSize:IWeistStock;
}

export const AdminProductPanelCard:FC<IAdminProductPanelCard> = ({product,stockSize}) => {
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();

  const handlePopUp=()=>{
    dispatch(onSelectActiveProduct(product))
    dispatch(onHandlePopUp({popUpType:"product",statusPopUp:!statusPopUp}))
  }

  const onHandleDelete = () => {
    const updatedWeistStock = product.weistStock.map(ws =>
      ws.id === stockSize.id
        ? { ...ws, active: false }
        : ws
    );
  
    dispatch(startUpdateProduct({
      ...product,
      img: product.imgs.length !== 0 ? [product.imgs[0].imgId] : [],
      weistStocks: updatedWeistStock,
      price: product.price.salePrice
    }));
  
    const anyActive = updatedWeistStock.some(ws => ws.active);
  
    if (!anyActive) {
      if (product.productId) {
        dispatch(startDeleteProduct(product.productId));
      }
    }
}
  
  const onHandleActivate=async()=>{
    const updatedWeistStock = product.weistStock.map(ws =>
      ws.id === stockSize.id
      ? { ...stockSize, active: true }
      : ws
    );
    dispatch(startUpdateProduct({...product,img:product.imgs.length!=0?[product.imgs[0].imgId]:[],weistStocks:updatedWeistStock,price:product.price.salePrice}));
    for(let weist of product.weistStock){
      if(weist.active){
        return dispatch(startUpdateProduct({...product,img:product.imgs.length!=0?[product.imgs[0].imgId]:[],active:true,price:product.price.salePrice}));
      }
    }
  }

  return (
    <>
        <tr key={product.productId}>
        <td className={style.adminProductPanelTableField} onClick={handlePopUp}>{product.productName}</td>
        <td className={style.adminProductPanelTableField}>{product.productType}</td>
        <td className={style.adminProductPanelTableField}>{product.price.salePrice?product.price.salePrice:0}</td>
        <td className={style.adminProductPanelTableField}>{product.price.salePrice?product.price.salePrice:0}</td>
        <td className={style.adminProductPanelTableField}>{stockSize.weist.value}</td>
        <td className={style.adminProductPanelTableField}>{stockSize.stock}</td>
        <td className={style.adminProductPanelTableField}>{stockSize.active ? "activo" : "inactivo" }</td>
        <th className={style.adminProductPanelTableField}><IoMdEye onClick={()=>navigate(`/detailProduct/${product.productId}`)}/>{!stockSize.active?<FaCheck onClick={onHandleActivate}/>:<FaTrashCan onClick={onHandleDelete}/>}</th>
     </tr>
    </>
  )
}
