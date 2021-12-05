class Article {
    articleTitle: string;
    articleAuthor: string;
    articleURL: (url: string) => string;

    constructor(articleURL: (url: string) => string, articleTitle: string, articleAuthor: string) {
        this.articleTitle = articleTitle;
        this.articleAuthor = articleAuthor;
        this.articleURL = articleURL;
    }
}

class User {
    name: string;
    isMSE: boolean;
    commentedOn: Article[];

    constructor(name: string, isMSE: boolean, commentedOn?: Article[]) {
        this.name = name;
        this.isMSE = isMSE;
        this.commentedOn = commentedOn;
    }
}

//
const fs = require('fs');
const nodePath = '/home/brahan/WebstormProjects/blog_scraper/DataScraper/data2.json';
let usersPool: Map<string, User> = new Map<string, User>();
// let articlePool: Article[];
const data = JSON.parse(fs.readFileSync(nodePath).toString());

// console.log(data)

function buildUserPool() {
    let curArticle;
    for (let ele in data) {
        // console.log(data[ele]['link']);
        curArticle = new Article(data[ele]['link'], data[ele]["articleTitle"], data[ele]["articleAuthor"]);
        // console.log(data[ele]["users"]);
        let curUser;
        let idx;
        let curUserList = data[ele]["users"];
        // console.log(curUserList);
        if (curUserList) {
            for (let u = 0; u < curUserList.length; u++) {
                curUser = new User(curUserList[u][0], curUserList[u][1],);
                if (usersPool.has(curUser.name)) {
                    let updateUser = usersPool.get(curUser.name);
                    updateUser.commentedOn.push(curArticle);
                    usersPool.set(updateUser.name, updateUser);
                } else {
                    curUser.commentedOn = []
                    curUser.commentedOn.push(curArticle);
                    usersPool.set(curUser.name, curUser);
                }
            }
        }
    }

    let values = Array.from(usersPool.values());
    fs.writeFile("userPool.json", JSON.stringify(values), (err) => {
        // console.log(usersPool);
        console.log('complete');
        if (err) throw err;
    })
}

buildUserPool();

