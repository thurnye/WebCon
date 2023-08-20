import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './navBar.module.css';
import {authActions} from '../../store/authSlice'
import{ Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery} from "@mui/material";
import { MdSearch, MdMessage, MdDarkMode, MdLightMode, MdNotifications, MdHelp, MdMenu, MdClose } from "react-icons/md";
import FlexBetweenBox from '../FlexBetweenBox/flexBetweenBox';
import SearchContainer from 'components/Search/SearchContainer/SearchContainer';



const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.dark;
  const background =theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;
  // const fullName = 'test tester';

  const handleLogout = () => {
    dispatch(authActions.logout())
    // redirect to login page
    navigate('/login')
  };
 
  return(
    <FlexBetweenBox padding='1rem 6%' backgroundColor={alt} data-testid="NavBar" className={styles.NavBar}>
     {user ? <>
        <FlexBetweenBox gap='1.75rem'>
          <Typography
          fontWeight = 'bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
          onClick = {() => navigate('/')}
          sx={{
            "&:hover":{
              color: primaryLight,
              cursor: 'pointer'
            }
          }}
          >
            WEBCon
          </Typography>
          {isNonMobileScreens && (
              <FlexBetweenBox
              backgroundColor={neutralLight}
              borderRadius='9px'
              gap='3rem'
              padding='0.1rem 1.5rem'
              >
              {/* <InputBase placeholder="Search..."/> */}
              <SearchContainer/>
              <IconButton>
                <MdSearch/>
              </IconButton>
              </FlexBetweenBox>
          )}
        </FlexBetweenBox>
        {/* Desktop Navigation */}
        {isNonMobileScreens ? (<FlexBetweenBox gap='2rem'>
            <IconButton onClick={() => dispatch(authActions.setMode())}>
              {theme.palette.mode === 'dark' ? (<MdDarkMode size={25}/>) : (<MdLightMode size={25} color={dark}/>)}
            </IconButton>
            <MdMessage size={25}/>
            <MdNotifications size={25}/>
            <MdHelp size={25} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
        </FlexBetweenBox>)
        : 
        (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <MdMenu/>
          </IconButton>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <MdClose />
              </IconButton>
            </Box>
  
            {/* MENU ITEMS */}
            <FlexBetweenBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(authActions.setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <MdDarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <MdLightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <MdMessage sx={{ fontSize: "25px" }} />
              <MdNotifications sx={{ fontSize: "25px" }} />
              <MdHelp sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetweenBox>
          </Box>
        )}
     </>
      : 
        <Typography
        fontWeight = 'bold'
        fontSize='clamp(1rem, 2rem, 2.25rem)'
        color='primary'
        onClick = {() => navigate('/login')}
        sx={{
          "&:hover":{
            color: primaryLight,
            cursor: 'pointer'
          }
        }}
        >
          WEBCon
        </Typography>
      }
    </FlexBetweenBox>
  )
};

export default NavBar;
