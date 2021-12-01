export module DataClasses{
    export class Article {
        articleTitle:string;
        articleAuthor:string;
        articleURL:string;

        constructor(articleTitle: string,articleAuthor: string,articleURL: string) {
            this.articleTitle = articleTitle;
            this.articleAuthor = articleAuthor;
            this.articleURL = articleURL;
        }
    }
    export class User {
        // commentedOn: [any];
        name: string;
        isMSE: boolean;

        constructor(name: string, isMSE: boolean) {
            this.name = name;
            this.isMSE = isMSE;
            // let commentedOn = [Article];

        }
    }

}

export class Article {
    articleTitle:string;
    articleAuthor:string;
    articleURL:string;

    constructor(articleTitle: string,articleAuthor: string,articleURL: string) {
        this.articleTitle = articleTitle;
        this.articleAuthor = articleAuthor;
        this.articleURL = articleURL;
    }
}

export class User {
    // commentedOn: [any];
    name: string;
    isMSE: boolean;

    constructor(name: string, isMSE: boolean) {
        this.name = name;
        this.isMSE = isMSE;
        // let commentedOn = [Article];

    }
}