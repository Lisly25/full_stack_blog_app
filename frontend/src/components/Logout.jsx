import { useUserDispatch } from "../contexts/UserContext";

//Styles

import { Button } from "@mui/material";

const Logout = () => {
  const dispatchUser = useUserDispatch();

  const deleteToken = () => {
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <Button color="inherit" onClick={deleteToken}>
      Log out
    </Button>
  );
};

export default Logout;
