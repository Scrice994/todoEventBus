import mongoose from 'mongoose';
import { IEntity } from "src/entities/IEntity";
import { IDataStorage } from "./IDataStorage";


export class MongoDataStorage<T extends IEntity> implements IDataStorage<T>{
    constructor(private _model: mongoose.Model<any>){}

    async find(obj: { [key: string]: unknown; }): Promise<T[]> {
        const findElements = await this._model.find(obj)
        return findElements.map( element => {
            const { _id, __v, ...result } = element.toObject()

            return result
        })
    }

    async findOneByKey(obj: { [key: string]: unknown; }): Promise<T> {
        const findElement = await this._model.findOne(obj);
        const { _id, __v, ...result } = findElement.toObject();

        return result;
    }

    async create(entity: Omit<T, "id">): Promise<T> {
        const newResult = await this._model.create(entity)
        const { _id, __v, ...result } = newResult.toObject();

        return result;
    }
    
}