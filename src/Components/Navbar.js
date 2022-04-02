import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import HubIcon from '@mui/icons-material/Hub';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar(props) {
  const history=useHistory()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
                                                         
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleChange=(e)=>{
         let txt=e.currentTarget.value
      let users=JSON.parse(localStorage.getItem("users"))
      let connections=JSON.parse(localStorage.getItem("connections"))
      let relation=JSON.parse(localStorage.getItem("relations"))
      
      if(txt!==""){
          if(txt.codePointAt(0)>=97)
          txt=String.fromCharCode(txt.codePointAt(0)-32)+txt.substring(1)
          if(Object.values(users).includes(txt)){
              let u={} 
              let userNode=Object.values(users).indexOf(txt)
              u[userNode]=users[userNode]
              for(let node of connections[userNode]){
                  u[node]=users[node];
              }
              let user_connections={}
              user_connections[userNode]=connections[userNode]
              let user_relations={}
              user_relations[userNode]=relation[userNode]
              props.setData({users:u,connections:user_connections,relations:user_relations})
          }
          else{
            props.setData({users:users,connections:connections,relations:relation})
          }
      }
      else{
        props.setData({users:users,connections:connections,relations:relation})
      }

  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            {/* <AddIcon /> */}
            Add Person
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            {/* <AddIcon /> */}
           Update Relation
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >Relation Degree
            {/* <HubIcon /> */}
        </IconButton>
        <p>Relation Degree</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=>{history.replace({pathname:"/"})}}
            >
              
                <HomeIcon />
            </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Person Relation's
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={()=>{history.replace({pathname:"/addperson"})}} size="small" aria-label="show 4 new mails" color="inherit">
              Add Person
                {/* <AddIcon /> */}
            </IconButton>
            <IconButton onClick={()=>{history.replace({pathname:"/updaterelation"})}} size="small" aria-label="show 4 new mails" color="inherit">
                Update Relation
                {/* <AddIcon /> */}
            </IconButton>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=>{history.replace({pathname:"/getrelationdegree"})}}
            >
              Relation Degree
                {/* <HubIcon /> */}
            </IconButton>
            
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
