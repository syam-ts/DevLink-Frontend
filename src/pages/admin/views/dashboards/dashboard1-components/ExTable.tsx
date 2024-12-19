 import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    email: "jsunil09@gmail.com",
    priority: "block",
    pbg: "success.main",
    earnings: "30",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    email: "adndreswmc98@gmail.com",
    priority: "block",
    pbg: "success.main",
    earnings: "16",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    email: "christ532@gmail.com",
    priority: "unblock",
    pbg: "error.main",
    earnings: "4",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    email: "nravjoshit3@gmail.com",
    priority: "unblock",
    pbg: "error.main",
    earnings: "25",
  }, 
  {
    id: "5",
    name: "manu kumar",
    email: "manukumar733@gmail.com",
    priority: "unblock",
    pbg: "error.main",
    earnings: "12",
  },
];

const ExTable = () => {
  return (
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Email
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Block/Unblock
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Total Jobs
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {product.name}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {product.email}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: product.pbg,
                  color: "#fff",
                }}
                size="small"
                label={product.priority}
              ></Chip>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">{product.earnings}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
