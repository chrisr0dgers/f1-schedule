import { Box } from "@mui/material";

const RaceHeader = (props) => {
  return (
    <Box
      flex="auto"
      sx={{ display: "flex", borderBottom: 1, pb: 2, mb: 2 }}
      justifyContent="between"
    >
      <Box flex="auto">
        <h2>{props.country}</h2>
        <p className="mb-0">{props.circuitName}</p>
      </Box>
      <Box
        flex="auto"
        sx={{ display: "flex" }}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <div>
          <p className="mb-0">
            <strong>Date:</strong> {props.date}
          </p>
        </div>
        <div></div>
      </Box>
    </Box>
  );
};

export default RaceHeader;
