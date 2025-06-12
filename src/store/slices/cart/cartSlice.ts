import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "../../../types/IProduct";
import { IImg } from "../../../types/IImg";


export interface ICartPorduct{
    productId?:number;
    productName:string;
    productType:string;
    productSubType:string;
    description:string;
    weist:string;
    color:string;
    imgs:IImg[];
    sex:string;
    selectedAmount:number;
    //discount:IDiscount;
    price:number;
    //active?:boolean;
}

interface ICartSlice{
    cartProducts:ICartPorduct[];
    isLoadingProducts:boolean;
    productMessage:string|null,
}


const initialState: ICartSlice = {
    cartProducts:[],
    isLoadingProducts:false,
    productMessage:null
    //actionPopUp:"",
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    onCheckCartProducts:(state)=>{
        state.isLoadingProducts=true;
    },
    onLoadCartProducts:(state,action:PayloadAction<ICartPorduct[]>)=>{
        state.cartProducts=action.payload;
        state.isLoadingProducts=false;
        state.productMessage=null
    },
    onAddCartProduct:(state,action:PayloadAction<ICartPorduct>)=>{
        state.cartProducts.push(action.payload);
        state.isLoadingProducts=false;
        state.productMessage=null
    },
    onUpdateCartProduct:(state,action:PayloadAction<ICartPorduct>)=>{
        state.cartProducts=state.cartProducts.map(product=>{
        if(product.productId === action.payload.productId){
          return action.payload;
        }
        return product;
      })
        state.isLoadingProducts=false;
        state.productMessage=null;
    },
    onDeleteCartProduct:(state,action:PayloadAction<number>)=>{
        state.cartProducts=state.cartProducts.filter(product=>product.productId !== action.payload);
        state.isLoadingProducts=false;
        state.productMessage=null;
    },
    onSeatCartMessage:(state,action:PayloadAction<string>)=>{
        state.productMessage=action.payload;
        state.isLoadingProducts=false;
        
    },
    onClearCartMessage:(state)=>{
        state.productMessage=null;
        state.isLoadingProducts=false;
    }
    },
  })
  
  export const { onCheckCartProducts,onAddCartProduct,onClearCartMessage,onLoadCartProducts,onSeatCartMessage,onUpdateCartProduct,onDeleteCartProduct } = cartSlice.actions
  
  export default cartSlice.reducer