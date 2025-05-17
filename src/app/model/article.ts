export class Article{
    id: string;
    authorId: string;
    createdTime: Date;
    title: string;
    description: string;
    content: string;
    tags: string[];
    likedBy: string[];
    dislikedBy: string[];
};