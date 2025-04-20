import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `a new blog ${action.payload.title} by ${action.payload.author} added`;
    case "CREATE_FAIL":
      return "Blog creation failed";
    case "LIKE_FAILED":
      return "Failed to like blog post";
    case "DELETE":
      return "Removed blog";
    case "DELETE_FAIL":
      return "Failed to remove blog";
    case "LOGIN":
      return "You logged in successfully";
    case "LOGIN_FAIL":
      return "Wrong credentials";
    case "COMMENT_FAILED":
      return "Failed to comment on blog";
    case "PASSWORD_MISMATCH":
      return "The second password does not match the first, please try again";
    case "REGISTRATION_SUCCESS":
      return `Registration successful. Welcome, ${action.payload.username}`;
    case "REGISTRATION_FAIL":
      return "Registration failed";
    case "EMPTY_FIELD":
      return "Form fields cannot be left empty";
    case "NULL":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useHideNotificationAfter_Time = () => {
  const dispatch = useNotificationDispatch();

  const hideNotification = (time) => {
    setTimeout(() => {
      dispatch({ type: "NULL" });
    }, time);
  };

  return hideNotification;
};

export default NotificationContext;
