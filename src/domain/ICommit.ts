export interface ICommit {
    message: string;
    author: IAuthor;
}

export interface IAuthor {
    date: string;
    name: string;
}
