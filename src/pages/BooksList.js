import { Card, CardActions, CardContent, CardMedia, Typography, Box, CardActionArea, Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { toast } from 'react-toastify';
import BookItem from '../components/BookItem';
import { Waypoint } from 'react-waypoint';
import { ThreeDots } from 'react-loader-spinner'

function BooksList() {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalBooks, setTotalBooks] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        console.log(location.state.search);
        let query = encodeURIComponent(location.state.search)
        const requestUri = `https://cors-anywhere.herokuapp.com/` +
            `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}&per_page=10&page=${page}`;
        try {
            const res = await axios.get(requestUri);
            var xml = new XMLParser().parseFromString(res.data);
            setTotalBooks(xml.getElementsByTagName('total-results')[0].value);
            setBooks([...books, ...xml.getElementsByTagName('best_book')]);
            setIsLoading(false);

        } catch (error) {
            if (error.response.status === 429) {
                toast.error("Too many attempts by localhost without cors", { toastId: 1, position: toast.POSITION.TOP_RIGHT, });
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <Box sx={{ marginBottom: "100px" }}>
            <Navbar />
            <Typography sx={{
                margin: "0 auto",
                mt: '30px',
                width: '72%'
            }} variant="h5" component="h5">Results : {location.state.search}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '17px',
                    margin: "0 auto",
                    rowGap: '30px',
                    mt: '30px',
                    width: '80%'
                }}
            >
                {books?.map((item) => {
                    return (<BookItem name={item.children[1].value} image={item.children[3].value} item={item} />)
                })}
            </Box>
            {isLoading &&
                <Container maxWidth={false} sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </Container>
            }
            {totalBooks !== null && books.length < totalBooks &&
                <Waypoint onEnter={({ ...args }) => {
                    setPage((prevState) => {
                        return prevState + 1
                    })
                }} />}
        </Box>
    )
}

export default BooksList