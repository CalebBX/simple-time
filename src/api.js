import axios from 'axios';

export default axios.create({
    baseURL: 'http://18.191.220.66:80/parse',
    headers: {
        'X-Parse-Application-Id': 'f46f189d7a5f49023ebef787c10cf501e464d794'
    }
});
