import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import blogService from "../services/blogs";

//Styles
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const BlogsView = ({ blogs, blogFormRef }) => {
  return (
    <div>
      <Typography sx={{ py: 1 }} variant="h4">
        Create new blog
      </Typography>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} blogService={blogService} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogsView;
