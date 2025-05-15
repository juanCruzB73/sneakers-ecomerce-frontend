import style from "./home.module.css";
import { NavBar } from "../UI/navbar/NavBar";
import homeImage1 from "../../assets/man_shoes.jpg";
import homeImage2 from "../../assets/jordansModel.jpg";
import { Carousel } from "../UI/carousel/Carousel";
import { Footer } from "../UI/footer/Footer";
import { useEffect } from "react";
import { startGetProducts } from "../../store/slices/product/productThunk";


const toListExample=[
    {
        "productId":1,
        "img":"img 1",
        "productName":"productName 1",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":2,
        "img":"img 2",
        "productName":"productName 2",
        "stock":2,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":3,
        "img":"img 3",
        "productName":"productName 3",
        "stock":4,
        "weist":"L",
        "price":{salePrice:1312}
      },
      {
        "productId":4,
        "img":"img 4",
        "productName":"productName 4",
        "stock":1,
        "weist":"L",
        "price":{salePrice:1312}
      },
  ]
export const Home=()=>{
  useEffect(()=>{
    const test=async()=>{
      await startGetProducts();
    }
    test();
  },[])

  return (
    <div className={style.homeMainContainer}>
        <NavBar/>
        <div className={style.homeDiscountContainer}><h3>descuentos</h3></div>
        <div className={style.homeMainImageContainer}>
          <div className={style.homeImageContainer}><img src={homeImage1} alt="" /></div>
          <div className={style.homeImageContainer}><img src={homeImage2} alt="" /></div>
        </div>
        <div className={style.homeAboutUsContainer}>
          <h2>Sneakers Society</h2>
          <h4>Sneakers Society is your go-to destination for the latest and greatest in sneaker culture. From iconic classics to new releases, we offer top brands and exclusive drops—all in one place. Step up your style with us.</h4>
        </div>
        <h2 style={{paddingLeft:"1rem"}}>Highliths</h2>
        <Carousel toList={toListExample}/>
        <Footer/>
    </div>
  )
}
