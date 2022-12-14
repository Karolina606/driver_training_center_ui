import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { ColorModeContext } from "../App";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "@mui/material";

const pagesAdmin = [
        {"title": "Użytkownicy", "link": "/users"},
        {"title": "Kursy", "link": "/courses"},
        {"title": "Lekcje", "link": "/lessons"},
        {"title": "Kategorie", "link": "/categories"},
        {"title": "Kursanci", "link": "/course-statuses"},
];

const pagesInstructor = [
        {"title": "Kursy", "link": "/courses"},
        {"title": "Lekcje", "link": "/lessons"},
        {"title": "Kursanci", "link": "/course-statuses"},
];

const pagesStudent = [
        {"title": "Lekcje", "link": "/lessons"},
        {"title": "Moje kursy", "link": "/course-statuses"},
];



const Navbar = (props) => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedUserOption, setSelectedUserOption] = React.useState(-1);
    const { user, logoutUser, userData, setUserData } = useContext(AuthContext);
    const { colorMode, setColorMode } = useContext(ColorModeContext);
    const history = useHistory();
    const theme = useTheme();


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        console.log({ anchorElUser });
        setAnchorElUser(null);
    };

    const settings = [
        <Button textAlign="center" component={Link} to="/user-profile" 
        sx={{color: theme.palette.text_primary.main}}
        >
            Profile
        </Button>,
        <Button textAlign="center" component={Link} 
        sx={{color: theme.palette.text_primary.main}}
         onClick={e => {
            setUserData({});
            logoutUser();
        }}>
            Wyloguj
        </Button>
    ];

    useEffect(() => {
        console.log({ selectedUserOption });
        if (selectedUserOption === 0) {
            history.push('/user-profile');
        } 
        handleCloseUserMenu();
        setSelectedUserOption(-1);

    }, [selectedUserOption]
    );

    const onMenuItemClick = (event, index) => {
        console.log({ index });
        setSelectedUserOption(index);
    }


    let menu_variants;
    if (user == null) {
        menu_variants = <></>
    } else {
        console.log({userData});
        var pages;

        if (userData?.groups?.includes("admin")){
            pages = pagesAdmin;
        }else if (userData?.groups?.includes("instructor")){
            pages = pagesInstructor;
        }else if (userData?.groups?.includes("student")){
            pages = pagesStudent;
        }

        menu_variants =
            <>
                {pages?.map((page) => (
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                        <Button textAlign="center" component={Link} to={page.link} 
                        sx={{ color: theme.palette.text_primary.main }}
                        >
                            {page.title}
                        </Button>
                    </MenuItem>
                ))}
            </>
    }

    let user_buttons;
    if (user == null) {
        user_buttons = <>
            <Button textAlign="center" component={Link} to="/login" sx={{color: theme.palette.text_primary.main}}>
                Login
            </Button>
            <Button textAlign="center" component={Link} to="/register" sx={{color: theme.palette.text_primary.main}}>
                Zarejestruj
            </Button>
        </>
    } else {
        user_buttons =
            <>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">

                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
                        </IconButton>

                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (
                            <MenuItem key={setting} onClick={(event) => onMenuItemClick(event, index)}
                                selectedUserOption={index === selectedUserOption}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </>
    }


    return (
        <AppBar position="static" >
            <Container maxWidth="x4">
                <Toolbar disableGutters>
                    <Link to="/">
                        <DirectionsCarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, 
                        color: theme.palette.text_primary.main 
                        }}  />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            // color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {menu_variants}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {menu_variants}
                    </Box>

                    <IconButton sx={{ ml: 1, mr: 2 }} onClick={props.colorMode.toggleColorMode} color="inherit">
                        {props.theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    {user_buttons}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;