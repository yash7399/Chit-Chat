import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const {isAuthenticated,screenLoading}=useSelector(state=>state.userReducer)
    const navigate=useNavigate()

    useEffect(()=>{
        if(!screenLoading && !isAuthenticated){
          navigate("/login")
        }
    },[isAuthenticated])

  return children
}

export default ProtectedRoute