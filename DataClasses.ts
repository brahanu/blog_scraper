export module DataClasses{
    class Article {
        articleTitle:string;
        articleAuthor:string;
        articleURL:string;

        constructor(articleTitle: string,articleAuthor: string,articleURL: string) {
            this.articleTitle = articleTitle;
            this.articleAuthor = articleAuthor;
            this.articleURL = articleURL;
        }
    }
    class User {
        // commentedOn: [any];
        name: string;
        isMSE: boolean;

        constructor(name: string, isMSE: boolean) {
            this.name = name;
            this.isMSE = isMSE;
            // let commentedOn = [Article];

        }
    }
    function buildDataBase(){}
}



// console.log(new User("aaa",true))