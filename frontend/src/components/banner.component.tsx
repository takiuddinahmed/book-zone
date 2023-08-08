import { Box, Typography } from "@mui/material";

export function Banner({ title }: { title: string }) {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", color: "white" }}>
        {" "}
        {title}
      </Typography>
    </Box>
  );
}
