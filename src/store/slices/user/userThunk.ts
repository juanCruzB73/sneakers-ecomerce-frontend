import { AppDispatch } from "../../store"
import { onCheckUsers, onClearUserMessage, onLoadUsers, onSelectActiveUser, onSetUserMessage, onUpdateUser } from "./userSlice";

const API_URL = import.meta.env.VITE_API_URL;

interface IUserEdit{
    userId:number;
    active?:boolean;
    userType?:string;
    username?:string;
    name?:string;
    lastname?:string;
    dni?:number;
    email?:string;
}
const token=localStorage.getItem("token");

export const startGetUsers=async()=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(onCheckUsers());
            const response = await fetch(`${API_URL}/user`);
            const data=await response.json();
            dispatch(onLoadUsers(data));
            dispatch(onClearUserMessage());
        }catch(error){
            console.log(error);
            dispatch(onSetUserMessage("error"))
        }
    }
};
export const startGetUserById=async(userId:number)=>{
    
        try{
            const response = await fetch(`${API_URL}/user/${userId}`);
            const data=await response.json();
            
            return data
        }catch(error){
            console.log(error);
            
        }
    }

export const startUpdateUser = (userIn:IUserEdit ) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_URL}/user/${userIn.userId}`, {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userIn),
      });
      const data = await response.json();
      dispatch(onUpdateUser(data));
      dispatch(onClearUserMessage());
    } catch (error) {
      dispatch(onSetUserMessage("Error updating user"));
      throw error;
    }
  };
};

export const startDeleteUser=(userId:number)=>{
  return async (dispatch: AppDispatch) => {
    try {
      await fetch(`${API_URL}/user/${userId}`, {method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },});
      dispatch(onClearUserMessage());
    } catch (error) {
      dispatch(onSetUserMessage("Error deleteing the user"));
      throw error;
    }
  };
}