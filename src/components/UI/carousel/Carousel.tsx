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
    const [startIndex, setStartIndex] = useState(0);
    const visibleItems=3;

    const handlePrev = () => {
      setStartIndex((prev) => (prev === 0 ? toList.length - 1 : prev - 1));
      };
    
      const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + visibleItems) % toList.length);
      };

      const getVisibleItems=()=>{
        return toList.slice(startIndex,startIndex+visibleItems).length === visibleItems ?
        toList.slice(startIndex,startIndex+visibleItems):
        [...toList.slice(startIndex),
          ...toList.slice(0,(startIndex+visibleItems)%toList.length)
        ]
      };

  return (
    <div className={styles.carouselMainContainer}>
        <button onClick={handlePrev}>⟨ Prev</button>
      {
        getVisibleItems().map(element=>(
            <CarouselCard element={element} />
        ))
      }
      <button onClick={handleNext}>Next ⟩</button>
    </div>
  )
}