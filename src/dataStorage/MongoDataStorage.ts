import mongoose from 'mongoose';
import { IEntity } from "src/entities/IEntity";
import { IDataStorage } from "./IDataStorage";


export class MongoDataStorage<T extends IEntity> implements IDataStorage<T>{
    constructor(private _model: mongoose.Model<any>){}

    async create(entity: Omit<T, "id">): Promise<T> {
        const newResult = await this._model.create(entity)
        const { _id, __v, ...result } = newResult.toObject();

        return result;
    }
    
}