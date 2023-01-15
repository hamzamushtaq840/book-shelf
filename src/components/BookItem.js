import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BookItem({ name, image, item, id }) {
    const navigate = useNavigate()

    const handleSingleItem = () => {
        navigate('/Bookdetail', { state: { id: item.children[0].value } })
    }

    return (
        <Card sx={{ minWidth: 205, maxWidth: 205 }} onClick={handleSingleItem}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="340"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default BookItem