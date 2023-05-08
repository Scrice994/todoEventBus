import { IEntity } from "src/entities/IEntity";

export interface IRepository<T extends IEntity> {
    getAll(obj: {[key: string]: unknown}): Promise<T[]>;
    getOneByKey(obj: {[key: string]: unknown}): Promise<T>
    insertOne(newEntity: Omit<T, 'id'>): Promise<T>;
    // updateOne(updateEntity: Required<IEntity> & Partial<T>): Promise<T>;
    // deleteOne(id: DataStorageId): Promise<T>;
    // deleteAll(obj: {[key: string]: unknown}): Promise<number>
}