import { Card, CardActions, CardContent, CardMedia, Typography, Box, CardActionArea } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { toast } from 'react-toastify';
import BookItem from '../components/BookItem';

function BooksList() {
    const location = useLocation()
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    const fetchData = async (e) => {
        const requestUri = `https://cors-anywhere.herokuapp.com/` + `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${location.state.search}`;
        try {
            const res = await axios.get(requestUri);
            var xml = new XMLParser().parseFromString(res.data);
            setBooks(xml.getElementsByTagName('best_book'));
            console.log(xml.getElementsByTagName('best_book'));
        }
        catch (error) {
            if (error.response.status === 429) {
                toast.error("Too many attempts by localhost without cors ", { toastId: 1, position: toast.POSITION.TOP_RIGHT, });
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <Navbar />
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
        </>
    )
}

export default BooksList