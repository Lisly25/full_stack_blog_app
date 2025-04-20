import { Link } from "react-router-dom";

//Styles
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Typography,
} from "@mui/material";

const UserRow = ({ user }) => {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <Button component={Link} to={`/users/${user.id}`}>
          {user.username}
        </Button>
      </TableCell>
      <TableCell>
        <Typography>{user.blogs.length}</Typography>
      </TableCell>
    </TableRow>
  );
};

const UsersView = ({ users }) => {
  if (users.isLoading) {
    return <div>Loading users data...</div>;
  } else {
    return (
      <div>
        <Typography sx={{ py: 1 }} variant="h4">
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h6">Blogs created</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data.map((user) => {
                return <UserRow key={user.id} user={user} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default UsersView;
