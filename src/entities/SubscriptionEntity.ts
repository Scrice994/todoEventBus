import { IEntity } from "./IEntity";

export interface SubscriptionEntity extends IEntity{
    eventHandlerURI: string
}