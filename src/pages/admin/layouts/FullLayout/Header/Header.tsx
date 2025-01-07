import React from "react"; 
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { signOutAdmin } from '../../../../../utils/redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
 

const Header = (props: any) => { 
 
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [anchorEl5, setAnchorEl5] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick4 = (event: any) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const logout = async () => {
 console.log('hit logout')
    const response = await axios.post('http://localhost:3000/admin/logout',{}, {
      withCredentials: true
    });
    console.log('The response ', response)
    if(response.data.type === 'success') {
        dispatch(signOutAdmin());
       navigate('/admin/login')
    } 
  }

 

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
 
        <Menu
          id="dd-menu"
          anchorEl={anchorEl5}
          keepMounted
          open={Boolean(anchorEl5)}
          onClose={handleClose5}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
         
          <Divider />
        
          
        </Menu>
        <Box flexGrow={1} />
 
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={ import.meta.env.VITE_ADMIN_PROFILE_PICTURE }
              alt='admin-profile-picture'
              sx={{
                width: "2.5rem",
                height: "2.5rem",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          {/* <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem> */}
          <Divider />
      
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <span onClick={logout}> Logout </span>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
