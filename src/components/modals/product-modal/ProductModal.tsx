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
          <div className={style.productModalInputMainContainer}>
            <div className={style.productModalInputContainer}>
              <input type="text" placeholder='porduct name'/>
              <input type="number" placeholder='precio'/>
              <select name="">
                <option value="">categoria</option>
                <option value="">categoria</option>
                <option value="">categoria</option>
              </select>
            </div>
            <div className={style.productModalInputMainContainerDescription}>
              <div className={style.productModalInputContainer}>
                <input type="text" placeholder='description'/>
                <div className={style.productModalImgInputContainer}>
                <span>Select product image</span>
                <input type="file" />
              </div>
              </div>
            </div>
          </div>
          
          <div className={style.productModalButtons}>
            <button type='button' onClick={handlePopUpProduct}>Cancel</button>
            <button type='submit'>Submit</button>
          </div>
      </div>
    </div>
  )
}
