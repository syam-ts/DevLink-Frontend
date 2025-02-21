import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import ExTable from "./ExTableUserText";

const ProductPerformance = ({users}: any) => {
  const [age, setAge] = React.useState("10");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0"
              }}
              gutterBottom
            >
              {/* Recent Contracts */}
              Top Freelancers
            </Typography>
          </Box>
 
        </Box>
        <Box
          sx={{
            overflow: "auto",
            mt: 3,
          }}
        >
          <ExTable users={users} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
