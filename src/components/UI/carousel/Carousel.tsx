import { FC, useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { CarouselCard } from "./carousel-card/CarouselCard";

interface ICarouselCard{
    image:string;
    title:string;
    description:string;
    price:number
}

interface ICarousel{
    toList:ICarouselCard[]
}


export const Carousel:FC<ICarousel> = ({toList}) => {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? toList.length - 1 : prev - 1));
      };
    
      const handleNext = () => {
        setIndex((prev) => (prev + 1) % toList.length);
      };

  return (
    <div className={styles.carouselMainContainer}>
        <button onClick={handlePrev}>⟨ Prev</button>
      {
        //toList.map(element=>(
            //<CarouselCard element={element} />
        //))
        <CarouselCard element={toList[index]} />
      }
      <button onClick={handleNext}>Next ⟩</button>
    </div>
  )
}