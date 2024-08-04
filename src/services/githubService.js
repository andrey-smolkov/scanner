import { httpService } from './httpService.js';
import { logger } from "../Logger.js";

class GithubService {
    constructor() {
        this.url = 'https://api.github.com'
    }

    getResponseData(response){
        return response?.data;
    }

    addToken(token){
        this.headers = {...this.headers, Authorization: `token ${token}` }
    }

    async getRepoList(token) {
        try {
            this.addToken(token);
            const response = await httpService.get(`${this.url}/user/repos`,  this.headers );
            return this.getResponseData(response)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getRepo({repoName, userName, token}) {
        try {
            this.addToken(token);
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}`, this.headers);
            return this.getResponseData(response)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getRepoContents({repoName, userName, token}) {
        try {
            this.addToken(token);
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}/git/trees/main?recursive=1`, this.headers );
            return response?.data?.tree || []
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getRepoHooks({repoName, userName}) {
        try {
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}/hooks`, this.headers );
            return this.getResponseData(response)
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

const githubService = new GithubService();

export  { githubService };