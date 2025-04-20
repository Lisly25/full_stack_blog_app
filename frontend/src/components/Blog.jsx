import { Link } from "react-router-dom";

//Styles
import { TableCell, TableRow, Button } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Button component={Link} to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Blog;
