import Axios from 'axios';

let urls = {
    test: `http://localhost:3000`,
    development: 'http://localhost:3000/',
    production: process.env.NEXT_PUBLIC_NODE_ENV
};
const api = Axios.create({
    // baseURL: process.env.NEXT_PUBLIC_NODE_ENV,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;
