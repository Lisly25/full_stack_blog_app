import { Typography, Link } from "@mui/material";

const Disclaimer = ({ show }) => {
  if (!show) return <div></div>;
  else {
    return (
      <div>
        <Typography variant="h3" sx={{ py: 2 }}>
          Disclaimer
        </Typography>
        <Typography sx={{ py: 2 }}>
          This website was created solely as a way of showcasing my current
          progress in learning web development tools
        </Typography>
        <Typography sx={{ pb: 1 }}>
          Originially, this was simply the product of exercise solutions for
          part 7 of the University of Helsinki Full Stack Open course
        </Typography>
        <Link
          target="_blank"
          rel="noreferrer"
          underline="hover"
          href="https://fullstackopen.com/en/"
        >
          Check out the course here
        </Link>
        <Typography sx={{ pt: 1 }} variant="h4">
          Privacy Policy
        </Typography>
        <Typography sx={{ py: 2 }}>
          This site does not collect any personal data. Blogs that you add can
          be deleted at any time. Comments that you might make on the blogs of
          other users are fully anonymous.
        </Typography>
        <Typography>
          On the other hand, I do retain the right to delete all website-related
          data, including user data, at any time.
        </Typography>
      </div>
    );
  }
};

export default Disclaimer;
