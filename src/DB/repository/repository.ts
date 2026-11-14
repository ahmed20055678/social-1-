
import { Model, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

class Repository<T> {
    constructor(private readonly model: Model<T>) { }

    findOne = async ({ filter, options = {} }: {
        filter: QueryFilter<T>,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findOne(filter, null, options);
    }

    findById = async ({ id, options = {} }: {
        id: any,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findById(id, null, options);
    }

    findByIdAndUpdate = async ({ id, update, options = {} }: {
        id: any,
        update: UpdateQuery<T>,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findByIdAndUpdate(
            id,
            update,
            {
                new: true,
                runValidators: true,
                ...options
            }
        );
    }

    findOneAndUpdate = async ({ filter, update, options = {} }: {
        filter: QueryFilter<T>,
        update: UpdateQuery<T>,
        options?: QueryOptions<T>
    }) => {
        return await this.model.findOneAndUpdate(
            filter,
            update,
            {
                new: true,
                runValidators: true,
                ...options
            }
        );
    }

    create = async (data: Partial<T>) => {
        return await this.model.create(data);
    }
}

export default Repository;
