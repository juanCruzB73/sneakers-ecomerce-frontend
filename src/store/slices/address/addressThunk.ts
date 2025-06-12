import { IAddresModal } from "../../../components/modals/address-modal/AddressModal";
import { AppDispatch } from "../../store";
import { onAddAddress, onCheckAddresses, onLoadAddresses } from "./addressSlice";

const API_URL = import.meta.env.VITE_API_URL;
const token=localStorage.getItem("token");

export const startGetAddresses=async(userId:number)=>{
    return async(dispatch:AppDispatch)=>{
            try{
                dispatch(onCheckAddresses());
                const response = await fetch(`${API_URL}/adress/user/${userId}`);
                const data=await response.json();
                dispatch(onLoadAddresses(data));
            }catch(error){
                //dispatch(onSetAddres("Error loading the products"));
                throw error;
            }
        }
};

export const startAddAddress = (addressIn: IAddresModal) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(onCheckAddresses());
      
      const response = await fetch(`${API_URL}/adress/create`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressIn),
      });

      const data = await response.json();

      dispatch(onAddAddress(data));
      //dispatch(onClearMessage());
    } catch (error) {
      //dispatch(onSeatMessage("Error creating the products"));
      throw error;
    }
  };
};