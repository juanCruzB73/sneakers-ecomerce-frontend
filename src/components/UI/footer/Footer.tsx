import styles from "./footer.module.css";
import logo from "../../../assets/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className={styles.footerMainContainer}>
        <div className={styles.footerInfoContainer}>
            <div>
                <h2>Products</h2>
                <h4>category 1</h4>
                <h4>category 2</h4>
                <h4>category 3</h4>
            </div>
            <div>
                <h2>Tu cuenta</h2>
                <h4>Perfil</h4>
            </div>
            <div className={styles.footerIcons}>
            <h2>Follow us</h2>
            <FaFacebookSquare />
            <IoLogoInstagram />
            <BsTwitterX />
            </div>
        </div>
      <div className={styles.footerImageContainer}><img src={logo} alt={logo} /></div>
    </div>
  )
}
