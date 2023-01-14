import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../store/user-slice'

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userActions.userInfo({}));
        navigate("/")
    }

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }} >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BookSearch
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar