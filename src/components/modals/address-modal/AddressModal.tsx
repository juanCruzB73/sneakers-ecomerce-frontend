import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import style from './addressModal.module.css';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { RootState } from '@reduxjs/toolkit/query';
import { startAddAddress } from '../../../store/slices/address/addressThunk';

export interface IAddresModal{
    city:string;
    province:string;
    street:string;
    streetNumber:string;
    userId?:number;
}

const initialState={
    city:"",
    province:"",
    street:"",
    streetNumber:""
}

export const AddressModal = () => {
    
    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
    const {user} = useSelector((state:RootState)=>state.auth);


    const {city,province,street,streetNumber,formValues,onInputChange,onResetForm}=useForm<IAddresModal>(initialState);
    const dispatch = useDispatch<AppDispatch>();

    const handlePopUpLogin=()=>{
      dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
    };

    const onHandleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(startAddAddress({ ...formValues, userId: user.userId }));
  handlePopUpLogin();
};

  return (
    <form className={style.addressModalMainContainer} onSubmit={onHandleSubmit}>
      <div className={style.addressModalContainer}>
        <h1>Addres Data</h1>
        <input type="text" value={city} onChange={onInputChange} name='city' placeholder='city'/>
        <input type="text" value={province} onChange={onInputChange} name='province' placeholder='province'/>
        <input type="text" value={street} onChange={onInputChange} name='street' placeholder='street'/>
        <input type="text" value={streetNumber} onChange={onInputChange} name='streetNumber' placeholder='street number'/>
        <div className={style.addressModalButtons}>
            <button type="submit">Submit</button>
            <button type='button' onClick={handlePopUpLogin}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
