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
import { IWeistStock } from '../../types/IWeistStock';


export const CatalogProduct = () => {

  const {products} = useSelector((state:RootState)=>state.product)
  const [seeMore,setSeeMore]=useState(false);
  const [productsFiltered,setProductsFiltered]=useState<IProduct[]>([]);
  const { sex, category } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [filteredBySize, setFilteredBySize] = useState<IProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [priceRange, setPriceRange] = useState(10000);

  useEffect(() => {
    const productsWithFilters = async () => {
      if (category === 'sport' || category === 'fashion' || category === 'urban') {
        const data = await getByFilters(sex!, category);
        setProductsFiltered(data);
        setDisplayedProducts(data);
      } else {
        const data = await getBySubFilters(sex!, category!);
        setProductsFiltered(data);
        setDisplayedProducts(data);
      }
    };
    productsWithFilters();
  }, [sex, category]);

useEffect(() => {
    const filtered = productsFiltered.filter((product) => {
      const matchesSize = selectedSize
        ? product.weistStock.some(
            (ws: IWeistStock) => ws.weist.value === selectedSize
          )
        : true;

      const matchesPrice = product.price.salePrice <= priceRange;

      return matchesSize && matchesPrice;
    });

    setDisplayedProducts(filtered);
  }, [selectedSize, priceRange, productsFiltered]);

  return (
    <div className={style.catalogProductMainContainer}>
      <NavBar/>
      <div className={style.catalogProductContainer}>
        {seeMore ? (
          <Wesits selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            priceRange={priceRange}
            onPriceChange={setPriceRange} />
        ) : null}
        <div className={style.catalogProductProductsContainer}>
          <h2>{category} for {sex} <LiaFilterSolid onClick={()=>setSeeMore(!seeMore)}/></h2>
          <div className={style.CatalogProductListProducts}>
            {
              displayedProducts.map((product: IProduct) => (
                <CardCatalog key={product.productId} product={product} />
              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
