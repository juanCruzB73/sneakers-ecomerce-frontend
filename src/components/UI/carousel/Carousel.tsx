import { FC, useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { CarouselCard } from "./carousel-card/CarouselCard";
import { IProduct } from "../../../types/IProduct";

interface ICarouselCard{
    image:string;
    title:string;
    description:string;
    price:number
}

interface ICarousel{
    products:IProduct[]
}


export const Carousel:FC<ICarousel> = ({products}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleItems,setVisibleItems]=useState(0);

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
      setStartIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
      };
    
      const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + visibleItems) % products.length);
      };

      const getVisibleItems=()=>{
        return products.slice(startIndex,startIndex+visibleItems).length === visibleItems ?
        products.slice(startIndex,startIndex+visibleItems):
        [...products.slice(startIndex),
          ...products.slice(0,(startIndex+visibleItems)%products.length)
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