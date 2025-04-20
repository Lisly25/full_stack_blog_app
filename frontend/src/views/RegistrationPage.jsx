import { TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../services/register";
import login from "../services/login";
import blogService from "../services/blogs";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts/UserContext";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const dispatchUser = useUserDispatch();

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (
      password.length === 0 ||
      username.length === 0 ||
      name.length === 0 ||
      repeatedPassword.length === 0
    ) {
      dispatchNotification({ type: "EMPTY_FIELD" });
      dispatchHideNotification(5000);
    } else if (password !== repeatedPassword) {
      setRepeatedPassword("");
      dispatchNotification({ type: "PASSWORD_MISMATCH" });
      dispatchHideNotification(5000);
    } else {
      try {
        await register({ username, name, password });
        const user = await login({
          username,
          password,
        });
        dispatchUser({ type: "LOGIN", payload: user });
        blogService.setToken(user.token);
        setUsername("");
        setName("");
        setPassword("");
        setRepeatedPassword("");
        dispatchNotification({
          type: "REGISTRATION_SUCCESS",
          payload: {
            username: username,
          },
        });
        dispatchHideNotification(5000);
        navigate("/");
      } catch (exception) {
        console.log("Registration error:", exception);
        dispatchNotification({ type: "REGISTRATION_FAIL" });
        dispatchHideNotification(5000);
      }
    }
  };

  return (
    <div>
      <Typography sx={{ pb: 2 }} variant="h2">
        Registration
      </Typography>
      <form onSubmit={handleRegistration}>
        <div>
          <TextField
            sx={{ py: 1 }}
            autoComplete="on"
            name="username"
            type="text"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ py: 1 }}
            autoComplete="on"
            name="name-field"
            type="text"
            label="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ py: 1 }}
            autoComplete="off"
            name="password-field"
            type="password"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ py: 1 }}
            autoComplete="on"
            name="password_repeated"
            type="password"
            label="password again"
            value={repeatedPassword}
            onChange={({ target }) => setRepeatedPassword(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
      <Typography sx={{ py: 1 }} variant="h4">
        Already a user? Log in <a href="/">here</a>
      </Typography>
    </div>
  );
};

export default RegistrationPage;
