import { FC, useEffect, useState } from 'react';
import { IProduct } from '../../types/IProduct';
import { Carousel } from '../UI/carousel/Carousel';
import { Footer } from '../UI/footer/Footer';
import { NavBar } from '../UI/navbar/NavBar';
import styles from './cart.module.css';
import { CartProduct } from '../UI/cart-porduct/CartProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { ICartPorduct } from '../../store/slices/cart/cartSlice';
import { startGetUserById } from '../../store/slices/user/userThunk';
import { IAdress } from '../../types/IAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { onHandlePopUp } from '../../store/slices/modals-states/modalSlice';
import { startCreateOrderDetail, startPayment } from '../../store/slices/order/orderThunk';
import { startUpdateProduct } from '../../store/slices/product/productThunk';
import { IWeistStock } from '../../types/IWeistStock';



export const Cart = () => {
  const {cartProducts} = useSelector((state:RootState)=>state.cart);
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const {products} = useSelector((state:RootState)=>state.product);
  const {addresses} = useSelector((state:RootState)=>state.address);
  const {user} = useSelector((state:RootState)=>state.auth);

  const [addressesToMap,setAddressesToMap]=useState<IAdress[]|[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);


  const dispatch = useDispatch<AppDispatch>();
  
  const totalPrice = cartProducts.reduce((acc:number, product:ICartPorduct) => {
    const price = Number(product.price);
    const quantity = (product as any).quantity || 1;
    return acc + price * quantity;
  }, 0);

  const handlePopUp=()=>{
    dispatch(onHandlePopUp({popUpType:"adddress",statusPopUp:!statusPopUp}))
  }

  useEffect(()=>{
    setAddressesToMap(addresses)
  },[addresses])

  const handlePayment = async () => {
  if (!selectedAddress) {
    alert('Please select an address');
    return;
  }
  
  try {
    const orderDetailIds: number[] = [];
    
    for (const product of cartProducts) {
      console.log('Processing product:', product);

      const detail = await startCreateOrderDetail({
        product: product.productId,
        amount: product.selectedAmount,
      });

      if (!detail?.orderDetailId) {
        console.error('Order detail creation failed for product:', product.productId);
        throw new Error('Order detail creation failed');
      }
      orderDetailIds.push(detail.orderDetailId);
      console.log('Order detail created:', detail);

      
      const updatedProducts = products.map((productToFind: IProduct) => {
        if (productToFind.productId === product.productId) {
          const selectedAmount = Number(product.selectedAmount);
          console.log('Updating weistStock for product:', productToFind.productId);

          const updatedWeistStock = productToFind.weistStock.map((ws: IWeistStock) => {
            if (ws.weist.value === product.weist.value) {
              const newStock = ws.stock - selectedAmount;
              console.log(`Reducing stock for weist '${ws.weist.value}': ${ws.stock} -> ${newStock}`);
              return { ...ws, stock: newStock };
            }
            return ws;
          });

          return {
            ...productToFind,
            weistStocks: updatedWeistStock,
          };
        }
        return productToFind;
      });

      const updatedProduct = updatedProducts.find(p => p.productId === product.productId);
      console.log('Payload to update product:', {
        ...updatedProduct,
        img: updatedProduct.imgs.length !== 0 ? [updatedProduct.imgs[0].imgId] : [],
        price: updatedProduct.price.salePrice,
      });

      if (updatedProduct) {
        dispatch(startUpdateProduct({
          ...updatedProduct,
          img: updatedProduct.imgs.length !== 0 ? [updatedProduct.imgs[0].imgId] : [],price: updatedProduct.price.salePrice
        }));
      }
    }
    const paymentPayload = {
      user: user.userId,
      address: selectedAddress,
      orderDetails: orderDetailIds,
    };
    console.log(selectedAddress)
    const paymentResponse = await startPayment(paymentPayload);

    if (paymentResponse?.initPoint) {

      window.location.href = paymentResponse.initPoint;
    } else {
      alert('No initPoint found in payment response');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('Something went wrong during payment.');
  }
};

  return (
    <div className={styles.cartMainContainer}>
      <NavBar/>
      <h1 style={{marginLeft:"1rem"}}>Your Cart</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartViewProducts}>
            {
              cartProducts.map((product:ICartPorduct)=>(
                <CartProduct product={product}/>
              ))
            }
        </div>
        <div className={styles.cartPaymentInformation}>
            <div className={styles.cartInformation}>
              <div><h1>Payment Information</h1></div>
              <h3>Number of products: {cartProducts.length}</h3>
              <h3>Delivery: 
                <select
                  onChange={(e) => setSelectedAddress(Number(e.target.value))}
                  value={selectedAddress !== null ? selectedAddress : ''}
                >
                  <option value="" disabled>Choose address</option>
                  {
                    addressesToMap.map((address) => (
                      <option key={address.adressId} value={address.adressId}>
                        {address.street} {address.streetNumber}
                      </option>
                    ))
                  }
                </select>
                <button onClick={handlePopUp}>Add address</button>
              </h3>
              <h3>Total: ${totalPrice}</h3>
              <button style={{marginLeft:"15px"}} onClick={handlePayment}>Finish Payment</button>
            </div>
        </div>
      </div>
      <h2 style={{marginLeft:"1rem"}}>Continue buying</h2>
      <Carousel products={products}/>
      <Footer/>
    </div>
  )
}