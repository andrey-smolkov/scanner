import { githubService } from "./githubService.js";
import { httpService } from "./httpService.js";

class RepoService {
    formatList(list) {
        return list.map(repo => ({
            name: repo.name,
            size: repo.size,
            owner: repo.owner.login,
        }));
    }

    decodeYmlContent(content) {
        return Buffer.from(content, 'base64').toString('utf-8');
    }

    async getRepoList(token) {
        const list = await githubService.getRepoList(token);
        return this.formatList(list);
    }

    async getYmlContent(url) {
        try {
            const response = await httpService.get(url);
            const responseData = githubService.getResponseData(response);
            return this.decodeYmlContent(responseData?.content);
        } catch (error) {
            // log error
            return null
        }
    }

    async getRepoDetails({token, repoName, userName}) {
        const [repo, contents, hooks] = await Promise.all([
            githubService.getRepo({token, repoName, userName}),
            githubService.getRepoContents({token, repoName, userName}),
            githubService.getRepoHooks({token, repoName, userName}),
        ]);

        const ymlFile = contents.find(item => item.path.endsWith('.yml'))
        const ymlContentPromise = ymlFile?.url
                ? this.getYmlContent(ymlFile.url)
                : Promise.resolve(null);

        const ymlContent = await ymlContentPromise;
        const webhooks = hooks.map(hook => hook.config.url);

        return {
            name: repo.name,
            size: repo.size,
            owner: repo.owner.login,
            isPrivate: repo.private,
            fileCount: contents.length,
            ymlContent,
            webhooks,
        };
    }
}

const repoService = new RepoService();

export { repoService };