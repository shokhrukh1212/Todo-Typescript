import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoaderComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;
