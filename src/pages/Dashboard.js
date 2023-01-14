import React, { useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Autocomplete, Button, CircularProgress, Container, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSugesstion = async (e) => {
        setQuery(e.target.value)
        setLoading(true)
        const requestUri = `https://cors-anywhere.herokuapp.com/` + `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}`;
        try {
            const res = await axios.get(requestUri);
            var xml = new XMLParser().parseFromString(res.data);
            setSuggestions(xml.getElementsByTagName('title'));
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            if (error.response.status === 429) {
                setLoading(false)
                toast.error("Too many attempts by try after 60min", { toastId: 1, position: toast.POSITION.TOP_RIGHT, });
            }
        }
    }

    const handleSearch = () => {
        navigate("/Booklists", { state: { search: query } })
    }

    return (
        <>
            <Navbar />
            <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Stack component="form" onSubmit={handleSearch} sx={{ backgroundColor: "white", width: '80%' }} direction='row' spacing={2} alignItems='center' >
                    <Autocomplete disablePortal id="combo-box-demo" getOptionLabel={(suggestions) => `${suggestions.value}`} options={suggestions} loading={loading} fullWidth renderInput={(params) => <TextField required value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        onChange={(e) => handleSugesstion(e)}
                        label="Search" {...params} InputProps={{ ...params.InputProps, endAdornment: (<React.Fragment> {loading ? <CircularProgress color="inherit" size={20} /> : null} {params.InputProps.endAdornment} </React.Fragment>) }} />} />
                    <Button variant="contained" type="submit" color="primary" sx={{ py: 1.8 }} onClick={handleSearch}>
                        Search
                    </Button>
                </Stack>
            </Container>
        </>
    );
}

export default Dashboard