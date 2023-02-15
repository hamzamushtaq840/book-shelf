import { Box, Container } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { userActions } from "../store/user-slice";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {}
    const dispatch = useDispatch();
    const navigate = useNavigate()
    console.log('Hello 6')



    const handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        if (!users[email]) {
            toast.error("Account does not exist", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            bcrypt.compare(password, users[email].password, function (err, result) {
                if (result) {
                    console.log(users[email]);
                    console.log(typeof (users[email]))
                    dispatch(userActions.userInfo(users[email]));
                    toast.success("Logged in successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    navigate('/dashboard')
                } else {
                    toast.error("Incorrect password", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
        }
    };

    return (
        <Container maxWidth="xl" component="main" sx={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#09f' }}>
            <Box sx={{
                width: 500,
                height: 560,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                p: 7,
                boxShadow: '0 2px 3px 0 rgba(0,0,0,.1)'
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3 }}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link href="/Signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login