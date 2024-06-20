import { Schema, model } from 'mongoose';
import {randomBytes,pbkdf2Sync} from 'node:crypto'
interface IUser {
    firstName?: string;
    lastName?: string;
    email: string;
    password:string;
    salt:string;
    creationDate:Date;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String },
    lastName:{ type: String },
    email:{ type: String, required: true, lowercase: true, trim: true },
    password:{ type: String, required: true },    
    salt    :{ type: String },
    creationDate:{type:Date, default: Date.now},
});


userSchema.pre('save', function(): void {

    const salt    = randomBytes(32).toString('hex')
    const genHash = pbkdf2Sync(this.password, salt, 10000, 64, 'sha512').toString('hex')
    this.password = genHash
    this.salt     = salt

    // console.log(this); // TypeScript knows that `this` is a `mongoose.Document & User` by default
});

const User = model<IUser>('users', userSchema);
export {User,IUser}
