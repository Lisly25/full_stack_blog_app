import { useUserDispatch } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

//Styles

import { Button } from "@mui/material";

const Logout = () => {
  const dispatchUser = useUserDispatch();
  const navigate = useNavigate();

  const deleteToken = () => {
    navigate("/");
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <Button color="inherit" onClick={deleteToken}>
      Log out
    </Button>
  );
};

export default Logout;
