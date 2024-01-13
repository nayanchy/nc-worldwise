import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  errorMessage: "",
});

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "password/mismatch":
      return {
        ...state,
        errorMessage: "Your password is incorrect.",
      };

    case "email/mismatch":
      return {
        ...state,
        errorMessage: "Your email is incorrect.",
      };
    case "password-email/mismatch":
      return {
        ...state,
        errorMessage: "Your password and email both are incorrect.",
      };
    default:
      throw new Error("Invalid action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
export const AuthContextProvider = ({ children }) => {
  const [{ isAuthenticated, user, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function loginHandler(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
    if (password !== FAKE_USER.password) {
      dispatch({
        type: "password/mismatch",
      });
    }
    if (email !== FAKE_USER.email) {
      dispatch({
        type: "email/mismatch",
      });
    }
    if (email !== FAKE_USER.email && password !== FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
  }

  function logoutHandler() {
    dispatch({
      type: "logout",
    });
  }
  const ctxVal = {
    user,
    isAuthenticated,
    loginHandler,
    logoutHandler,
    errorMessage,
  };

  return <AuthContext.Provider value={ctxVal}>{children}</AuthContext.Provider>;
};

const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext used outside of context provider");
  }

  return context;
};

export default useAuthentication;
