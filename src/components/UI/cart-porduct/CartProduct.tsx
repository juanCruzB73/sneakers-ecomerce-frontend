import { FC } from 'react';
import style from './cartProduct.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { ICartPorduct, onDeleteCartProduct } from '../../../store/slices/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';

interface ICartProduct{
    product:ICartPorduct ;
}

export const CartProduct:FC<ICartProduct> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={style.cartProductMainContainer}>
      <div className={style.cartProductImgContainer}><img src={product.imgs[0].imgUrl} alt={product.imgs[0].imgUrl} /></div>
      <div className={style.cartProductInfoContainer}>
        <h4>name: {product.productName}</h4>
        <h4>weist: {product.weist}</h4>
        <h4>price: ${product.price}</h4>
        <h4>selected amount: {product.selectedAmount}</h4>
      </div>
      <div className={style.cartProductButtons}>
        <FaTrashAlt onClick={()=>product.productId&&dispatch(onDeleteCartProduct(product.productId))}/>
      </div>
    </div>
  )
}
