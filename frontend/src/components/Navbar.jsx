import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import {Link, useLocation} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Navbar(props) {
  const {content} = props
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  const logoutUser = () =>{
     AxiosInstance.post(`logoutall/`,{
     })
     .then( () => {
        localStorage.removeItem("Token")
        navigate('/')
     }

     )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          
              <ListItem key={1} disablePadding>
                <ListItemButton component={Link} to="/home" selected={"/home" === path}>
                  <ListItemIcon>
                        <HomeIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={2} disablePadding>
              <ListItemButton component={Link} to="/users" selected={"/users" === path}>
                  <ListItemIcon>
                        <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Utilisateurs"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={3} disablePadding>
                <ListItemButton component={Link} to="/services" selected={"/services" === path}>
                  <ListItemIcon>
                    <HomeRepairServiceIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Services"} />
                </ListItemButton>
                </ListItem>

                <ListItem key={4} disablePadding>
                <ListItemButton component={Link} to="/tarifs" selected={"/tarifs" === path}>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                 <ListItemText primary={"Tarifs"} />
                </ListItemButton>
                </ListItem>

              <ListItem key={5} disablePadding>
                <ListItemButton component={Link} to="/questions" selected={"/questions" === path}>
                    <ListItemIcon>
                      <QuestionAnswerIcon />
                    </ListItemIcon>
                 <ListItemText primary={"Questions"} />
                </ListItemButton>
                </ListItem>


              <ListItem key={6} disablePadding>
              <ListItemButton onClick={logoutUser}>
                  <ListItemIcon>
                        <LogoutIcon/> 
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
  
          </List>
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
            {content}
      </Box>
    </Box>
  );
}