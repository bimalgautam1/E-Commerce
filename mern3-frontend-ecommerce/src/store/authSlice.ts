import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { AppDispatch } from "./store";
import { API } from "../http";

// Login input type
interface ILoginUser {
  email: string;
  password: string;
}

// Register input type (no token)
interface IRegisterInput {
  username: string;
  email: string;
  password: string;
}

// User state type (includes token)
interface IUser {
  username: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
}

interface IAuthState {
  user: IUser;
  status: Status;
}

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
    token: null,
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});

export const { setStatus, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;

// Register user (input type doesn't require token)
export function registerUser(data: IRegisterInput) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/register", data);
      console.log(response);

      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        const { username, email, password, token } = response.data;
        dispatch(setUser({ username, email, password, token }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Login user
export function loginUser(data: ILoginUser) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        if (response.data.token) {
          localStorage.setItem("tokenHoYo", response.data.token);
          dispatch(setToken(response.data.token));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Forgot password
export function forgotPassword(data: { email: string }) {
  return async function forgotPasswordThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/auth/forgot-password", data);
      console.log(response);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
