import { useSelector } from 'react-redux';
import { CarouselCard } from '../UI/carousel/carousel-card/CarouselCard';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import { Wesits } from '../UI/weists/Wesits';
import style from './catalogProduct.module.css';
import { RootState } from '@reduxjs/toolkit/query';
import { IProduct } from '../../types/IProduct';
import { CardCatalog } from '../UI/card-catalog/cardCatalog';
import { useEffect, useState } from 'react';
import { LiaFilterSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import { getByFilters, getBySubFilters } from '../../store/slices/product/productThunk';


export const CatalogProduct = () => {

  const {products} = useSelector((state:RootState)=>state.product)
  const [seeMore,setSeeMore]=useState(false);

  const [productsFiltered,setProductsFiltered]=useState<IProduct[]>([]);

  const { sex, category } = useParams();

  useEffect(()=>{
    const productsWithFilters=async()=>{
      if(category=="sport" || category=="fashion" || category=="urban"){
        const data=await getByFilters(sex!,category);
        setProductsFiltered(data);
      }else{
        const data=await getBySubFilters(sex!,category!);
        setProductsFiltered(data);
      }
    };
    productsWithFilters();
  },[sex, category])

  return (
    <div className={style.catalogProductMainContainer}>
      <NavBar/>
      <div className={style.catalogProductContainer}>
        {seeMore?<Wesits/>:<></>}
        <div className={style.catalogProductProductsContainer}>
          <h2>{category} for {sex} <LiaFilterSolid onClick={()=>setSeeMore(!seeMore)}/></h2>
          <div className={style.CatalogProductListProducts}>
            {
              productsFiltered.map((product:IProduct)=>(
                <CardCatalog product={product}/>
              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
