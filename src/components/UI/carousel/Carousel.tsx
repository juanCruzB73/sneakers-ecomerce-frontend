import { FC, useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { CarouselCard } from "./carousel-card/CarouselCard";
import { IProduct } from "../../../types/IProduct";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export const Carousel:FC<ICarousel> = () => {
    const {activeProducts} = useSelector((state:RootState)=>state.product);

    const [startIndex, setStartIndex] = useState(0);
    const [visibleItems,setVisibleItems]=useState(3);

    useEffect(()=>{
      const handleSize=()=>{
        if(window.innerWidth > 768){
          setVisibleItems(3)
        }else{
          setVisibleItems(2)
        }
      };
      window.addEventListener('resize', handleSize);
      return () => window.removeEventListener('resize', handleSize);
    },[]);

    const handlePrev = () => {
      setStartIndex((prev) => (prev === 0 ? activeProducts.length - 1 : prev - 1));
      };
    
      const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + visibleItems) % activeProducts.length);
      };

      const getVisibleItems=()=>{
        return activeProducts.slice(startIndex,startIndex+visibleItems).length === visibleItems ?
        activeProducts.slice(startIndex,startIndex+visibleItems):
        [...activeProducts.slice(startIndex),
          ...activeProducts.slice(0,(startIndex+visibleItems)%activeProducts.length)
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