import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-8ca99.firebaseio.com'
});

export default instance;