import { Schema, model, InferSchemaType } from 'mongoose';
import * as uuid from 'uuid';

const subscriptionSchema = new Schema({
    eventHandlerURI: { type: String, required: true},
    id: { type: String, default: uuid.v4 }
})

type Subscription = InferSchemaType<typeof subscriptionSchema>

export const Subscription = model<Subscription>('Subscription', subscriptionSchema)