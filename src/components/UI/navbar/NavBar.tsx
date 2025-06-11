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
                  {productCategories.map((type) => (
                  <h4 key={type} onClick={() => navigate(`/filters/${sex}/${type}`)}>{type}</h4>
                  ))}
                </div>
                <div className={styles.seeMoreOptions}>
                  <h3>Product types</h3>
                  {productTypes.map((type) => (
                    <h4 key={type} onClick={() => navigate(`/filters/${sex}/${type}`)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h4>
                  ))}
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
                      {productCategories.map((type) => (
                      <h4 key={type} onClick={() => navigate(`/filters/${sex}/${type}`)}>{type}</h4>
                      ))}
                    </div>
                    <div className={styles.seeMoreOptions}>
                      <h3>Product types</h3>
                        {productTypes.map((type) => (
                          <h4 key={type} onClick={() => navigate(`/filters/${sex}/${type}`)}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                          </h4>
                        ))}
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