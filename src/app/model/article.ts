export class Article{
    id: number;
    authorUserName: string;
    createdTime: Date;
    title: string;
    content: string;
    imageURLs: string[];
    tags: string[];
    likedBy: string[];
    dislikedBy: string[];
};