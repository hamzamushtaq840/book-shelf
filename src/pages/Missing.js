import { Container, Typography } from '@mui/material'
import React from 'react'


function Missing() {
    return (
        <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
            <Typography component="h1" variant="h5" >
                Missing
            </Typography>
        </Container>
    )
}

export default Missing