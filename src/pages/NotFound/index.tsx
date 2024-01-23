import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Typography variant="h3">Page not found</Typography>

      <Button variant="contained" onClick={handleClick}>
        Go to main page
      </Button>
    </>
  );
};

export default NotFound;
