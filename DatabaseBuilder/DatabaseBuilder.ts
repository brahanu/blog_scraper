// class Article {
//     articleTitle: string;
//     articleAuthor: string;
//     articleURL: string;
//
//     constructor(articleTitle: string, articleAuthor: string, articleURL: string) {
//         this.articleTitle = articleTitle;
//         this.articleAuthor = articleAuthor;
//         this.articleURL = articleURL;
//     }
// }
//
// class User {
//     // commentedOn: [any];
//     name: string;
//     isMSE: boolean;
//
//     constructor(name: string, isMSE: boolean) {
//         this.name = name;
//         this.isMSE = isMSE;
//         // let commentedOn = [Article];
//
//     }
// }
//
// class DatabaseBuilder {
//     // usersPool: User[];
//     // let
//     userPool = new Map<string, User>();
//     articlePool: Article[];
//
//     constructor(scrapedData: [any]) {
//         for (let i = 0; i < scrapedData.length; i++) {
//
//             let curArticle = scrapedData[i]['articleTitle'];
//             let curArticleURL = scrapedData[i]['link'];
//             for (let j = 0; j < scrapedData[i]['users'].length; j++) {
//                 let curUser = new User(scrapedData[i]['users'][j]["name"], scrapedData[i]['users'][j]["isMSE"]);
//
//                 if (this.usersPool.indexOf(scrapedData[i]['users'][j]) === -1) {
//
//                     this.usersPool.push()
//                 }
//             }
//         }
//         this.usersPool = [];
//         this.articlePool = [];
//     }
//
// }
