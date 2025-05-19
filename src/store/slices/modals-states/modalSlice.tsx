import { createSlice } from "@reduxjs/toolkit";
import { IPopUp } from "../../../types/IPopUp";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IPopUp = {
    statusPopUp:false,
    popUpType:"",
    //actionPopUp:"",
}

export interface IOnOpenPopUpInterface{
    statusPopUp:boolean,
    popUpType:string,
    //actionPopUp:string,
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
      onHandlePopUp:(state,action:PayloadAction<IOnOpenPopUpInterface>)=>{
        state.statusPopUp = action.payload.statusPopUp;
        state.popUpType = action.payload.popUpType;
        //state.actionPopUp=action.payload.actionPopUp
      },
      onClosePopUp:(state)=>{
        state.statusPopUp=false;
        state.popUpType="";
        //state.actionPopUp=""
      },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onHandlePopUp,onClosePopUp } = popUpSlice.actions
  
  export default popUpSlice.reducer