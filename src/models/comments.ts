import { Schema, model } from 'mongoose';


interface IComment {
    author: string;
    comments: string;
    commentDate:Date;
}

const commentSchema = new Schema<IComment>({
    author: { type: String, required: true, lowercase: true, trim: true},
    comments: { type: String, required: true },
    commentDate:{type:Date, default: Date.now}
});

const Comment = model<IComment>('comments', commentSchema);
export {Comment}
