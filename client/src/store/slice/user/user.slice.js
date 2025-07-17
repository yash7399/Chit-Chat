import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk, registerUserThunk,logoutUserThunk, getUserProfileThunk, getOtherUsersThunk } from './user.thunk'

const initialState={
  isAuthenticated:false,
  screenLoading:true,
  userProfile:null,
  buttonLoading:false,
  otherUsers:null,
  selectedUser:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {  // sunchronus fns

    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload
    }

  },
  extraReducers:(builder)=>{  // fro async fucntions
    //login 
    builder.addCase(loginUserThunk.pending,(state,action)=>{
      state.buttonLoading=true
    })
    builder.addCase(loginUserThunk.fulfilled,(state,action)=>{
      state.userProfile= action.payload?.responseData?.user
      state.buttonLoading=false
      state.isAuthenticated=true
    })
    builder.addCase(loginUserThunk.rejected,(state,action)=>{
      state.buttonLoading=false
    })

    //register
    builder.addCase(registerUserThunk.pending,(state,action)=>{
      state.buttonLoading=true
    })
    builder.addCase(registerUserThunk.fulfilled,(state,action)=>{
      state.userProfile= action.payload?.responseData?.user
      state.buttonLoading=false
      state.isAuthenticated=true
    })
    builder.addCase(registerUserThunk.rejected,(state,action)=>{
      state.buttonLoading=false
    })

    //logout

    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
      console.log("Logout")
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      console.log("Cannot logout")
    });


    // get user profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      console.log("Get profile pending")
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      console.log("Get profile fullfiled")

      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // get other users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

  }
})


export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer