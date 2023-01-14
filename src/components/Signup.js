import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const saltRounds = 10;

function Signup() {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || {});
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let password = data.get('password')
        let firstName = data.get('firstName')
        let lastName = data.get('lastName')
        if (users[email]) {
            toast.error("Account with this email already exists", {
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const newUsers = { ...users, [email]: { firstName, lastName, email, password: hash } };
                setUsers(newUsers);
                localStorage.setItem('users', JSON.stringify(newUsers));
                toast.success("Account created", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/')
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
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link href="/" variant="body2">
                                {"Already have an account? LogIn"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    )
}

export default Signup