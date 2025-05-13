import { FC } from 'react';
import { IProduct } from '../../../types/IProduct';
import style from './cartProduct.module.css';
import { FaEye } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';

interface ICartProduct{
    product:IProduct;
}

export const CartProduct:FC<ICartProduct> = ({product}) => {
  return (
    <div className={style.cartProductMainContainer}>
      <div className={style.cartProductImgContainer}><img src={product.img} alt={product.img} /></div>
      <div className={style.cartProductInfoContainer}>
        <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
        </select>
        <h4>{product.productName}</h4>
        <h4>{product.weist}</h4>
        <h4>{product.price.salePrice}</h4>
      </div>
      <div className={style.cartProductButtons}>
        <FaEye />
        <FaTrashAlt />
      </div>
    </div>
  )
}
