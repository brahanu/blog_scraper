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