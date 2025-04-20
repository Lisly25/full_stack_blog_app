import { useParams } from "react-router-dom";

//Styles

import { List, ListItem, ListItemText, Typography } from "@mui/material";

const UserProfile = ({ users }) => {
  const id = useParams().id;

  if (users.isLoading) {
    return <div>Loading user profile...</div>;
  } else {
    const userList = users.data;

    const user = userList.find((n) => n.id === id);

    return (
      <div>
        <Typography sx={{ py: 2 }} variant="h4">
          {user.username}
        </Typography>
        <Typography variant="h5">Added blogs:</Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem divider={true} key={blog.id}>
              <ListItemText>{blog.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
};

export default UserProfile;
