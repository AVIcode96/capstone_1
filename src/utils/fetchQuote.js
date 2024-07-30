// src/utils/fetchQuote.js
import axios from 'axios';

const fetchQuote = async () => {
    try {
        const response = await axios.get('https://type.fit/api/quotes');
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return randomQuote;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
};

export default fetchQuote;
