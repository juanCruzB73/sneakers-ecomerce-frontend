import styles from "./navBar.module.css";
import logo from "../../../assets/logo.png";
import { IoPersonSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const NavBar = () => {
    const [hamburgerButton,setHamburggerButton]=useState(false);
    const [showHamburgerButton,setShowHamburgerButton]=useState(window.innerWidth < 768);
    const [isWide, setIsWide] = useState(window.innerWidth > 768);
    const [seeMore,setSeeMore]=useState(false);

    const navigate=useNavigate();

    useEffect(()=>{
      console.log(window.innerWidth)
      const handleSize=()=>{
        setIsWide(window.innerWidth > 768);
        setHamburggerButton(false);
        setShowHamburgerButton(window.innerWidth < 768)
      };
      window.addEventListener('resize', handleSize);
      return () => window.removeEventListener('resize', handleSize);
    },[]);

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
              <div className={styles.navBarSearchOptions}><p onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>Men</p><p onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>Women</p><p onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>kids</p></div>
              <div className={seeMore?styles.navBarSeeMore:styles.seeMoreHide}  onMouseEnter={()=>handleMouseEnter()}>
                <div className={styles.seeMoreOptions} onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>
                  <h3>categoria</h3>
                  <h4>categoria 1</h4>
                  <h4>categoria 2</h4>
                  <h4>categoria 3</h4>
                  <h4>categoria 4</h4>
                </div>
                <div className={styles.seeMoreOptions}>
                <h3>tipo de producto</h3>
                  <h4>tipo de producto 1</h4>
                  <h4>tipo de producto 2</h4>
                  <h4>tipo de producto 3</h4>
                  <h4>tipo de producto 4</h4>
                </div>
              </div>
          </div>
          <div className={styles.navBarImageContainer}><img src={logo} alt="logo" /></div>
          <div className={styles.navBarSearchOptionsContainerWide} >        
            {
              !showHamburgerButton?(
              <div className={styles.navBarSearchOptionsContainerOptionsWide}>
                <div className={styles.navBarSearchOptionsWide}><p onMouseEnter={()=>handleMouseEnter()}>Men</p><p onMouseEnter={()=>handleMouseEnter()}>Women</p><p onMouseEnter={()=>handleMouseEnter()}>kids</p></div>
                <div className={seeMore?styles.navBarSeeMore:styles.seeMoreHide} onMouseLeave={()=>handleMouseLeave()}>
                    <div className={styles.seeMoreOptions}>
                      <h3 >categoria</h3>
                      <h4 >categoria 1</h4>
                      <h4 >categoria 2</h4>
                      <h4 >categoria 3</h4>
                      <h4 >categoria 4</h4>
                    </div>
                    <div className={styles.seeMoreOptions}>
                      <h3>tipo de producto</h3>
                      <h4>tipo de producto 1</h4>
                      <h4>tipo de producto 2</h4>
                      <h4>tipo de producto 3</h4>
                      <h4>tipo de producto 4</h4>
                    </div>
                </div>
             </div> 
            ):(<></>)
            }
          </div>
          <div className={styles.navBarSearchContainer}>
            {
              !isWide ? (<><FaSearch /><IoPersonSharp /><FaCartShopping onClick={()=>navigate("/cart")}/></>): (<><input type="text" placeholder="Search" /><IoPersonSharp /><FaCartShopping /></>)
            }
          </div>
      </div>
    )
}