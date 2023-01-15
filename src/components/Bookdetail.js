import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { Box, Typography, Image } from "@mui/material";
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

function Bookdetail() {
    const location = useLocation()
    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (bookId) => {
        const requestUri = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show.xml?key=FtRVHgmjzjpzKjCt3SUMw&id=${bookId}`;
        try {
            const res = await axios.get(requestUri);
            var xml = new XMLParser().parseFromString(res.data);
            const bookData = xml.getElementsByTagName('book')[0];
            const title = bookData.getElementsByTagName("title")[0].value;
            const image_url = bookData.getElementsByTagName("image_url")[0].value;
            const description = bookData.getElementsByTagName('description')[0].value;
            const average_rating = bookData.getElementsByTagName('average_rating')[0].value;
            const rating_count = bookData.getElementsByTagName('ratings_count')[0].value;
            const publisher = bookData.getElementsByTagName('publisher')[0].value;
            const pages = bookData.getElementsByTagName('num_pages')[0].value;
            const link = bookData.getElementsByTagName('link')[0].value;
            const language = bookData.getElementsByTagName('language_code')[0].value;
            setBook({ title, image_url, description, average_rating, rating_count, publisher, pages, link, language });
            setIsLoading(false);
        } catch (error) {
            if (error.response.status === 429) {
                toast.error("Too many attempts by localhost without cors", { toastId: 1, position: toast.POSITION.TOP_RIGHT, });
            }
        }
    }

    useEffect(() => {
        // get the bookId from the location state 
        const bookId = location.state.id;
        fetchData(bookId);
    }, []);




    return (
        <>
            <Navbar />
            {isLoading ? (
                <Container maxWidth={false} sx={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" visible={true} />
                </Container>
            ) : (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    backgroundColor: "white",

                }}>
                    <Box px={3} sx={{ width: '100%' }}>
                        <img style={{ width: '15%' }} src={book.image_url} alt={book.name} />
                    </Box>
                    <Box px={3} sx={{ mt: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            {book.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            <strong>Publisher:</strong> {book.publisher}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <strong>Average rating:</strong> {book.average_rating}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <strong>Rating count:</strong> {book.rating_count}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <strong>Number of pages:</strong> {book.pages}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <strong>Link:</strong> <a href={book.link}>{book.link}</a>
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            <strong>Language:</strong> {book.language}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Description :</strong> {book.description}
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Bookdetail