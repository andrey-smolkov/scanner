## Prerequisites
- Clone repo
- run `npm install`
- run `node index.js`



## Query

```
query {
     listRepositories(
        token: "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"
    ) {
        name
        size
        owner
    }
    repositoryListDetails(
        token: "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",
        repoNames: ["app1", "app2", "app3"],
        userName: "andrey-smolkov",
    ) {
        name
        size
        owner
        isPrivate
        fileCount
        ymlContent
        webhooks
    }
}
```