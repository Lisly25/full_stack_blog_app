import { useState } from "react";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts/UserContext";

//Styles
import { Button, TextField, Typography } from "@mui/material";

const LoginForm = ({ login, blogService }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const dispatchUser = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password });
      dispatchUser({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatchNotification({ type: "LOGIN" });
      dispatchHideNotification(5000);
    } catch (exception) {
      console.log(exception);
      dispatchNotification({ type: "LOGIN_FAIL" });
      dispatchHideNotification(5000);
    }
  };

  return (
    <div>
      <Typography sx={{ pb: 2 }} variant="h2">
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            sx={{ py: 1 }}
            autoComplete="on"
            label="username"
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ py: 1 }}
            label="password"
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
      <Typography sx={{ py: 1 }} variant="h4">
        Not a user yet? Register <a href="/register">here</a>
      </Typography>
    </div>
  );
};

export default LoginForm;
