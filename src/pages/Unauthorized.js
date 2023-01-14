import { Container, Typography } from '@mui/material'
import React from 'react'

function Unauthorized() {
    return (
        <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
            <Typography component="h1" variant="h5" >
                Unauthorized
            </Typography>
        </Container>
    )
}

export default Unauthorized