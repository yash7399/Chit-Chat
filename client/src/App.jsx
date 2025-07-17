import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsersThunk, getUserProfileThunk, loginUserThunk } from './store/slice/user/user.thunk';
import { Toaster } from "react-hot-toast";

function App() {
  
  const {isAuthenticated}=useSelector(state=> state.userReducer)
  
  const dispatch=useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
      await dispatch(getOtherUsersThunk())
    })();
  }, []);
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
