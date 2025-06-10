import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAdress } from "../../../types/IAddress";

interface IAddresSlice{
    addresses:IAdress[];
    activeAddress:IAdress|null;
    isLoadingAddresses:boolean;
    addressMessage:string|null,
}


const initialState: IAddresSlice = {
    addresses:[],
    activeAddress:null,
    isLoadingAddresses:false,
    addressMessage:null
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
    onCheckAddresses:(state)=>{
        state.isLoadingAddresses=true;
    },
    onLoadAddresses:(state,action:PayloadAction<IAdress[]>)=>{
        state.addresses=action.payload;
        state.isLoadingAddresses=false;
        state.addressMessage=null
    },
    onSelectActiveAddress:(state,action:PayloadAction<IAdress>)=>{
        state.activeAddress=action.payload;
        state.isLoadingAddresses=false;
        state.addressMessage=null
    },
    onAddAddress:(state,action:PayloadAction<IAdress>)=>{
        state.addresses.push(action.payload);
        state.isLoadingAddresses=false;
        state.addressMessage=null
    },
    onUpdateAddress:(state,action:PayloadAction<IAdress>)=>{
        state.addresses=state.addresses.map(address=>{
        if(address.addressId === action.payload.addressId){
          return action.payload;
        }
        return address;
      })
        state.isLoadingAddresses=false;
        state.addressMessage=null;
    },
    onDeleteAddress:(state,action:PayloadAction<number>)=>{
        state.addresses=state.addresses.filter(address=>address.addressId !== action.payload);
        state.isLoadingAddresses=false;
        state.addressMessage=null;
    },
    onSeatMessage:(state,action:PayloadAction<string>)=>{
        state.addressMessage=action.payload;
        state.isLoadingAddresses=false;
        
    },
    onClearMessage:(state)=>{
        state.addressMessage=null;
        state.isLoadingAddresses=false;
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onCheckAddresses,onSelectActiveAddress,onAddAddress,onClearMessage,onLoadAddresses,onSeatMessage,onUpdateAddress,onDeleteAddress } = addressSlice.actions
  
  export default addressSlice.reducer