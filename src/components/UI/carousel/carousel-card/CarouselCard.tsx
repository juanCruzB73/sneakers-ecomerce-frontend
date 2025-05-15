import { FC } from "react";
import styles from "./carouselCard.module.css";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../../types/IProduct";

interface ICarouselCard{
    element:IProduct;
}


export const CarouselCard:FC<ICarouselCard> = ({element}) => {
  
  const navigate=useNavigate();

  return (
    <div className={styles.carouselCardMainContainer} >
        <div className={styles.carouselCardImageContainer}><img src={element.img} alt={element.img} /></div>
        <h3 onClick={()=>navigate(`/detailProduct/${element.productId}`)}>{element.productName}</h3>
        <h4>{element.productType}</h4>
        <h4>{element.price.salePrice}</h4>
    </div>
  )
}
