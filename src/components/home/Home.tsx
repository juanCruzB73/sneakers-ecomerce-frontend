import style from "./home.module.css";
import { NavBar } from "../UI/navbar/NavBar";
import homeImage1 from "../../assets/man_shoes.jpg";
import homeImage2 from "../../assets/jordansModel.jpg";
import { Carousel } from "../UI/carousel/Carousel";
import { Footer } from "../UI/footer/Footer";


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
]

export const Home=()=>{
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
