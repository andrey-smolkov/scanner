## Prerequisites
- Clone repo
- run `npm install`
- run `node index.js`
- add token to query
- run query



## Query

```
query {
     listRepositories(
        token: ""
    ) {
        name
        size
        owner
    }
    repositoryListDetails(
        token: "",
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