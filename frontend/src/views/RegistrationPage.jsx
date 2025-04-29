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
import Disclaimer from "../components/Disclaimer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const dispatchUser = useUserDispatch();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registrationMutation = useMutation({
    mutationFn: register,
    onSuccess: async (newUserData) => {
      const oldUserList = queryClient.getQueryData(["users"]);
      //const newUserList = { ...oldUserList, newUserData };
      const newUserList = oldUserList.concat(newUserData);
      console.log("New user list after registration:", newUserList);
      queryClient.setQueryData(["users"], newUserList);
      const user = await login({
        username,
        password,
      });
      dispatchUser({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
      setUsername("");
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
    },
    onError: () => {
      dispatchNotification({ type: "REGISTRATION_FAIL" });
      dispatchHideNotification(5000);
    },
  });

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (
      password.length === 0 ||
      username.length === 0 ||
      repeatedPassword.length === 0
    ) {
      dispatchNotification({ type: "EMPTY_FIELD" });
      dispatchHideNotification(5000);
    } else if (password !== repeatedPassword) {
      setRepeatedPassword("");
      dispatchNotification({ type: "PASSWORD_MISMATCH" });
      dispatchHideNotification(5000);
    } else {
      registrationMutation.mutate({ username: username, password: password });
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
      <div>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() =>
            showDisclaimer === true
              ? setShowDisclaimer(false)
              : setShowDisclaimer(true)
          }
        >
          Disclaimer
        </Button>
        <Disclaimer show={showDisclaimer} />
      </div>
    </div>
  );
};

export default RegistrationPage;
