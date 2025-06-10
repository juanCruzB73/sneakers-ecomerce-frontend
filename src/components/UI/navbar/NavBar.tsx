import styles from "./navBar.module.css";
import logo from "../../../assets/logo.png";
import { IoPersonSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { onHandlePopUp } from "../../../store/slices/modals-states/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";


export const NavBar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [hamburgerButton,setHamburggerButton]=useState(false);
    const [showHamburgerButton,setShowHamburgerButton]=useState(window.innerWidth < 768);
    const [isWide, setIsWide] = useState(window.innerWidth > 768);
    const [seeMore,setSeeMore]=useState(false);
    const [sex,setSex]=useState("");
    const [category,setCategory]=useState("");

    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);

    const navigate=useNavigate();

    useEffect(()=>{
      const handleSize=()=>{
        setIsWide(window.innerWidth > 768);
        setHamburggerButton(false);
        setShowHamburgerButton(window.innerWidth < 768)
      };
      window.addEventListener('resize', handleSize);
      return () => window.removeEventListener('resize', handleSize);
    },[]);

    const handlePopUp=()=>{
        dispatch(onHandlePopUp({popUpType:"login",statusPopUp:!statusPopUp}))
    }

    const handleMouseEnter=()=>{
      setSeeMore(true);
    }
    const handleMouseLeave=()=>{
      setSeeMore(false);
    }
    

    return (
      <div className={styles.navBarMainContainer}>
          {showHamburgerButton?<GiHamburgerMenu style={{padding:"1rem"}} onClick={()=>{setHamburggerButton(!hamburgerButton)}}/>:<></>}
          <div className={hamburgerButton ? styles.navBarSearchOptionsContainer : styles.navBarSearchOptionsContainerHide }>        
              <div className={styles.navBarSearchOptions}><p onMouseEnter={()=>{handleMouseEnter();setSex("male")}} onMouseLeave={()=>handleMouseLeave()}>Men</p><p onMouseEnter={()=>{handleMouseEnter();setSex("female")}} onMouseLeave={()=>handleMouseLeave()}>Women</p><p onMouseEnter={()=>{handleMouseEnter();setSex("kid")}} onMouseLeave={()=>handleMouseLeave()}>kids</p></div>
              <div className={seeMore?styles.navBarSeeMore:styles.seeMoreHide}  onMouseEnter={()=>handleMouseEnter()}>
                <div className={styles.seeMoreOptions} onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>
                  <h3>Categories</h3>
                  <h4 onClick={()=>navigate(`/filters/${sex}/sport`)}>Sport</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/fashion`)}>Fashion</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/urban`)}>Urban</h4>
                </div>
                <div className={styles.seeMoreOptions}>
                <h3>Product types</h3>
                  <h4 onClick={()=>navigate(`/filters/${sex}/football`)}>Football</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/basketball`)}>Basketball</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/running`)}>Running</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/heels`)}>Heels</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/boots`)}>Boots</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/dress`)}>Dress</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/sandals`)}>Sandals</h4>
                  <h4 onClick={()=>navigate(`/filters/${sex}/slipsOn`)}>Slip-ons</h4>
                </div>
              </div>
          </div>
          <div className={styles.navBarImageContainer} onClick={()=>navigate("/")}><img src={logo} alt="logo" /></div>
          <div className={styles.navBarSearchOptionsContainerWide} >        
            {
              !showHamburgerButton?(
              <div className={styles.navBarSearchOptionsContainerOptionsWide}>
                <div className={styles.navBarSearchOptionsWide}><p onMouseEnter={()=>{handleMouseEnter();setSex("male")}}>Men</p><p onMouseEnter={()=>{handleMouseEnter();setSex("female")}}>Women</p><p onMouseEnter={()=>{handleMouseEnter();setSex("kid")}}>kids</p></div>
                <div className={seeMore?styles.navBarSeeMore:styles.seeMoreHide} onMouseLeave={()=>handleMouseLeave()}>
                    <div className={styles.seeMoreOptions}>
                      <h3 >Categories</h3>
                      <h4 onClick={()=>navigate(`/filters/${sex}/sport`)}>Sport</h4>
                      <h4 onClick={()=>navigate(`/filters/${sex}/fashion`)}>Fashion</h4>
                      <h4 onClick={()=>navigate(`/filters/${sex}/urban`)}>Urban</h4>
                    </div>
                    <div className={styles.seeMoreOptions}>
                      <h3>Product types</h3>
                        <h4 onClick={()=>navigate(`/filters/${sex}/football`)}>Football</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/basketball`)}>Basketball</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/running`)}>Running</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/heels`)}>Heels</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/boots`)}>Boots</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/dress`)}>Dress</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/sandals`)}>Sandals</h4>
                        <h4 onClick={()=>navigate(`/filters/${sex}/slipsOn`)}>Slip-ons</h4>
                    </div>
                </div>
             </div> 
            ):(<></>)
            }
          </div>
          <div className={styles.navBarSearchContainer}>
            {
              !isWide ? (<><FaSearch /><IoPersonSharp onClick={handlePopUp}/><FaCartShopping onClick={()=>navigate("/cart")}/></>): (<><input type="text" placeholder="Search" /><IoPersonSharp onClick={handlePopUp}/><FaCartShopping onClick={()=>navigate("/cart")}/></>)
            }
          </div>
      </div>
    )
}