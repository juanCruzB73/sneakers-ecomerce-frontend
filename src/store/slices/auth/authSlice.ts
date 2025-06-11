import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../types/IUser';


export interface IUserAuth{
    userId?:string|null;
    username:string;
    email:string;
    userType:string;
}

export interface IAuthState {
    status:string;
    user:IUserAuth
    errorMessage:null | string
}

export interface IPayloadResgister {
    username:string;
    email:string;
    password:string;
}


const initialState: IAuthState = {
    status:"non-authenticated",
    user:{
        username:"",
        email: "",
        userId:null,
        userType:"",
    },
    errorMessage:null,
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking:(state)=>{
        state.status="checking",
        state.user={
            username:"",
            email: "",
            userId:null,
            userType:"",
        },
        state.errorMessage=null
    },
    onLogin:(state,action:PayloadAction<IUserAuth>)=>{
        state.status="authenticated",
        state.user=action.payload,
        state.errorMessage=null
    },
    onLogOut:(state)=>{
        state.status="non-authenticated",
        state.user={
            username:"",
            email: "",
            userId:null,
            userType:"",
        },
        state.errorMessage=null
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { onChecking,onLogin,onLogOut } = authSlice.actions

export default authSlice.reducer