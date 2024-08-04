import { httpService } from './httpService.js';


class GithubService {
    constructor(token) {
        this.url = 'https://api.github.com'
        this.headers  = {Authorization: `token ${token}`};
    }

    getResponseData(response){
        return response?.data;
    }

    async getRepoList(token) {
        try {
            const response = await httpService.get(`${this.url}/user/repos`,  this.headers );
            return this.getResponseData(response)
        } catch (error) {
            // log error
            throw error;
        }
    }

    async getRepo({repoName, userName}) {
        try {
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}`, this.headers);
            return this.getResponseData(response)
        } catch (error) {
            // log error
            throw error;
        }
    }

    async getRepoContents({repoName, userName}) {
        try {
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}/git/trees/master?recursive=1`, this.headers );
            return response?.data?.tree || []
        } catch (error) {
            // log error
            throw error;
        }
    }

    async getRepoHooks({repoName, userName}) {
        try {
            const response = await httpService.get(`${this.url}/repos/${userName}/${repoName}/hooks`, this.headers );
            return this.getResponseData(response)
        } catch (error) {
            // log error
            throw error;
        }
    }
}

const githubService = new GithubService(process.env['GITHUB_TOKEN']);

export  { githubService };