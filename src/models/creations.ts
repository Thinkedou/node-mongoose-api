import { Schema, model,Types } from 'mongoose';

interface IAuthor{
    lastName:string;
    firstName:string;
}
interface ICreation {
    imgUri: string;
    title: string;
    isValidated?: boolean;
    categories:string[];
    comments:Types.ObjectId[];
    author:IAuthor;
    publicationDate:Date;
    prompt:string;
}

const creationSchema = new Schema<ICreation>({
    imgUri: { type: String, required: true, lowercase: true, trim: true},
    title: { type: String, required: true },
    prompt:{ type: String, required: true },
    categories:{type:[String]},
    comments:[{ type:Types.ObjectId, ref: 'comments' }],
    author:{
        lastName : { type: String, lowercase: true, trim: true },
        firstName:{ type: String, lowercase: true, trim: true }
    },
    publicationDate:{type:Date, default: Date.now},
    isValidated: Boolean
});

const Creation = model<ICreation>('creations', creationSchema);
export {Creation,ICreation}
