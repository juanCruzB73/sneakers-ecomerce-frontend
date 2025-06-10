import { FC } from "react";
import style from './cardCatalog.module.css';
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../types/IProduct";
;

interface ICardCatalog{
    product:IProduct;
}

export const CardCatalog:FC<ICardCatalog> = ({product}) => {
    const navigate=useNavigate();
    return (
      <div className={style.cardCatalogMainContainer} >
          <div className={style.cardCatalogImgContainer}><img src={product.imgs.length>0 ? product.imgs[0].imgUrl:"no images"} alt={product.imgs.length>0 ? product.imgs[0].imgUrl:"no images"} /></div>
          <div>
            <h3 onClick={()=>navigate(`/detailProduct/${product.productId}`)}>{product.productName}</h3>
            <h4>{product.productType}</h4>
            <h4>{product.price.salePrice}</h4>
          </div>
      </div>
    )
}
