import styles from "./footer.module.css";
import logo from "../../../assets/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { onHandlePopUp } from "../../../store/slices/modals-states/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export const Footer = () => {
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const productCategories = ['sport', 'fashion', 'urban'];
    const productTypes = [
      'football',
      'basketball',
      'running',
      'heels',
      'boots',
      'dress',
      'sandals',
      'slipsOn',
    ];
    const navigate=useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const handlePopUp=()=>{
            dispatch(onHandlePopUp({popUpType:"login",statusPopUp:!statusPopUp}))
        }
  return (
    <div className={styles.footerMainContainer}>
        <div className={styles.footerInfoContainer}>
            <div>
                <h2>Products</h2>
                {productTypes.map(productType=>(
                  <h4 onClick={()=>navigate(`/filters/male/${productType}`)}>{productType}</h4>
                ))}
            </div>
            <div>
                <h2>Tu cuenta</h2>
                <h4 onClick={handlePopUp}>Login</h4>
                <h4 onClick={handlePopUp}>Register</h4>
            </div>
            <div className={styles.footerIcons}>
            <h2>Follow us</h2>
            <FaFacebookSquare />
            <IoLogoInstagram />
            <BsTwitterX />
            </div>
        </div>
    </div>
  )
}
