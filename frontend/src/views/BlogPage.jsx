import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";
import { useUserValue } from "../contexts/UserContext";
import blogService from "../services/blogs";

//Styles

import { Button, TextField, Typography } from "@mui/material";

const AddComment = ({
  dispatchNotification,
  dispatchHideNotification,
  blogID,
}) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: (updatedBlog) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const newBlogs = oldBlogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      queryClient.setQueryData(["blogs"], newBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "COMMENT_FAILED" });
      dispatchHideNotification(5000);
    },
  });

  const addComment = async (event) => {
    event.preventDefault();
    newCommentMutation.mutate([blogID, { comment: comment }]);
    setComment("");
  };

  return (
    <form onSubmit={addComment} id="add-comment">
      <TextField
        sx={{ p: 1 }}
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id="new-comment"
        autoComplete="off"
      />
      <Button
        sx={{ m: 1, p: 1 }}
        variant="contained"
        color="primary"
        type="submit"
      >
        add comment
      </Button>
    </form>
  );
};

const Comments = ({ comments }) => {
  let commentId = 0;

  if (!comments) {
    return null;
  } else {
    return (
      <Typography>
        {comments.map((comment) => {
          commentId += 1;
          return <li key={commentId}>{comment}</li>;
        })}
      </Typography>
    );
  }
};

const BlogPage = ({ blogList }) => {
  const id = useParams().id;
  const user = useUserValue();

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const blogs = oldBlogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      queryClient.setQueryData(["blogs"], sortedBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "LIKE_FAILED" });
      dispatchHideNotification(5000);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      dispatchNotification({ type: "DELETE" });
      dispatchHideNotification(5000);
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const newBlogs = oldBlogs.filter((n) => n.id !== id);
      queryClient.setQueryData(["blogs"], newBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "DELETE_FAIL" });
      dispatchHideNotification(5000);
    },
  });

  if (blogList.isLoading) {
    return <div>Loading page...</div>;
  } else {
    const likeBlog = async (event) => {
      event.preventDefault();

      const blogData = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      likeBlogMutation.mutate([blogData, blog.id]);
    };

    const handleBlogDelete = async (event) => {
      event.preventDefault();
      deleteBlogMutation.mutate(blog.id);
    };

    const blogData = blogList.data;
    const blog = blogData.find((n) => n.id === id);

    return (
      <div>
        <Typography sx={{ py: 1 }} variant="h3">
          <b>{blog.title}</b> by {blog.author}
        </Typography>
        <Typography sx={{ py: 1 }}>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Typography>
        <Typography variant="h6">
          {blog.likes} likes
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="primary"
            onClick={likeBlog}
          >
            like
          </Button>
        </Typography>
        <Typography sx={{ py: 1 }} variant="h6">
          Added by <b>{blog.user.username}</b>
          {user.username === blog.user.username && (
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="primary"
              onClick={handleBlogDelete}
            >
              Remove
            </Button>
          )}
        </Typography>
        <Typography sx={{ py: 1 }} variant="h4">
          Comments
        </Typography>
        <AddComment
          dispatchHideNotification={dispatchHideNotification}
          dispatchNotification={dispatchNotification}
          blogID={blog.id}
        />
        <Comments comments={blog.comments} />
      </div>
    );
  }
};

export default BlogPage;
