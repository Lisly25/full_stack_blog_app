import { useNotificationValue } from "../contexts/NotificationContext";

//Styles

import { Alert } from "@mui/material";

const Notification = () => {
  const message = useNotificationValue();

  if (message === null) {
    return null;
  }

  return (
    <div>
      <Alert severity="info" data-testid="error-message">
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
