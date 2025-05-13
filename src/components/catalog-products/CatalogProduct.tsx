import { CarouselCard } from '../UI/carousel/carousel-card/CarouselCard';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import style from './catalogProduct.module.css';

const toListExample=[
    {
      "image":"image 1",
      "title":"title 1",
      "description":"description 1",
      "price":1312
    },
    {
      "image":"image 2",
      "title":"title 2",
      "description":"description 2",
      "price":4354
    },
    {
      "image":"image 3",
      "title":"title 3",
      "description":"description 3",
      "price":76786
    },
    {
      "image":"image 4",
      "title":"title 4",
      "description":"description 4",
      "price":9380
    },
    {
      "image":"image 5",
      "title":"title 5",
      "description":"description 5",
      "price":792730
    },
    {
      "image":"image 6",
      "title":"title 6",
      "description":"description 6",
      "price":792730
    },
  ]

export const CatalogProduct = () => {
  return (
    <div className={style.catalogProductMainContainer}>
      <NavBar/>
      <div className={style.catalogProductContainer}>
        <div className={style.catalogProductFilterContainer}>
          <h3>Filtros</h3>
          <ul>
            <li>filter</li>
            <li>filter</li>
            <li>filter</li>
            <li>filter</li>
          </ul>
          <h3>talles</h3>
          <select name="" id="">
            <option value="">XL</option>
            <option value="">S</option>
            <option value="">M</option>
            <option value="">S</option>
          </select>
        </div>
        <div className={style.catalogProductProductsContainer}>
          <h2>categoria seleccionada</h2>
          <div className={style.CatalogProductListProducts}>
            {
              toListExample.map(product=>(
                <CarouselCard element={product}/>
              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
