import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BookItem({ name, image, item }) {
    const navigate = useNavigate()

    const handleSingleItem = () => {
        let obj1 = [{
            id: 19
        },]
        navigate('/Bookdetail', { state: { name: item.children[1].value, author: item.children[2].children[1].value, image: item.children[3].value, obj: obj1 } })
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