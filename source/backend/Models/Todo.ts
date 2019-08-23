import { prop, Typegoose } from 'typegoose';


export default class Todo extends Typegoose {
    @prop({ required: true })
    title!: string;
    @prop({ required: true })
    complete?: string;
}