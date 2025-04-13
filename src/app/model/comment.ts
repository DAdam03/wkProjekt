export class Comment{
    id: number;
    writtenBy: string;
    articleId: number;
    replyTo: number;
    content: string;
    createdTime: Date;
};