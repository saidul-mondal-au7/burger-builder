import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pure-harbor-293206-default-rtdb.firebaseio.com/'
});

export default instance;