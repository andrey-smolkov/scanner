import axios from 'axios';

class HttpService {
    constructor() {
        this.api = axios
    }

    get(url, headers) {
        return this.api.get(url, { headers });
    }
}

const httpService = new HttpService();

export { httpService }