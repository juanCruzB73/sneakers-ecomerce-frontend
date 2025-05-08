import { FC } from "react";
import styles from "./carouselCard.module.css";

interface ICarouselCard{
    element:{image:string;
        title:string;
        description:string;
        price:number}
}


export const CarouselCard:FC<ICarouselCard> = ({element}) => {
  return (
    <div className={styles.carouselCardMainContainer}>
        <div className={styles.carouselCardImageContainer}><img src={element.image} alt={element.image} /></div>
        <h3>{element.title}</h3>
        <h4>{element.description}</h4>
        <h4>{element.price}</h4>
    </div>
  )
}
