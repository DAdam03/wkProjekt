export class Article{
    id: number;
    authorUserName: string;
    createdTime: Date;
    title: string;
    description: string;
    content: string;
    tags: string[];
    likedBy: string[];
    dislikedBy: string[];
};