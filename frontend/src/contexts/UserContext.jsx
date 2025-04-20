import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(action.payload),
      );
      return action.payload;
    }
    case "LOGOUT": {
      window.localStorage.removeItem("loggedBlogAppUser");
      return null;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[0];
};

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch[1];
};

export default UserContext;
