import { useSelector } from 'react-redux';
import style from './productModal.module.css';
import { useDispatch } from 'react-redux';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import { AppDispatch } from '../../../store/store';
import { RootState } from '@reduxjs/toolkit/query';

export const ProductModal = () => {
    const {statusPopUp,popUpType,actionPopUp} = useSelector((state:RootState)=>state.popUp);
    const dispatch = useDispatch<AppDispatch>();
    const handlePopUpProduct=()=>{
      dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
  }
  return (
    <div className={style.productModalMainContainer}>
      <div className={style.productModalContainer}>
            <div>
                <input type="text" />
                <input type="text" />
            </div>
            <div className={style.productModalButtons}>
                <button type='button' onClick={handlePopUpProduct}>Cancel</button>
                <button type='submit'>Submit</button>
            </div>
      </div>
    </div>
  )
}
