import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "../../../types/IProduct";

interface IProductSlice{
    products:IProduct[];
    activeProduct:IProduct|null;
    isLoadingProducts:boolean;
    productMessage:string|null,
}


const initialState: IProductSlice = {
    products:[],
    activeProduct:null,
    isLoadingProducts:false,
    productMessage:null
    //actionPopUp:"",
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    onCheckProducts:(state)=>{
        state.isLoadingProducts=true;
    },
    onLoadProducts:(state,action:PayloadAction<IProduct[]>)=>{
        state.products=action.payload;
        state.isLoadingProducts=false;
        state.productMessage=null
    },
    onSelectActiveProduct:(state,action:PayloadAction<IProduct>)=>{
        state.activeProduct=action.payload;
        state.isLoadingProducts=false;
        state.productMessage=null
    },
    onAddProduct:(state,action:PayloadAction<IProduct>)=>{
        state.products.push(action.payload);
        state.isLoadingProducts=false;
        state.productMessage=null
    },
    onUpdateProduct:(state,action:PayloadAction<IProduct>)=>{
        state.products=state.products.map(product=>{
        if(product.productId === action.payload.productId){
          return action.payload;
        }
        return product;
      })
        state.isLoadingProducts=false;
        state.productMessage=null;
    },
    onDeleteProduct:(state,action:PayloadAction<number>)=>{
        state.products=state.products.filter(product=>product.productId !== action.payload);
        state.isLoadingProducts=false;
        state.productMessage=null;
    },
    onSeatMessage:(state,action:PayloadAction<string>)=>{
        state.productMessage=action.payload;
        state.isLoadingProducts=false;
        
    },
    onClearMessage:(state)=>{
        state.productMessage=null;
        state.isLoadingProducts=false;
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onCheckProducts,onSelectActiveProduct,onAddProduct,onClearMessage,onLoadProducts,onSeatMessage,onUpdateProduct,onDeleteProduct } = productSlice.actions
  
  export default productSlice.reducer