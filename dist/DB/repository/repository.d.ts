import { Model, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
declare class Repository<T> {
    private readonly model;
    constructor(model: Model<T>);
    findOne: ({ filter, options }: {
        filter: QueryFilter<T>;
        options?: QueryOptions<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findById: ({ id, options }: {
        id: any;
        options?: QueryOptions<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findByIdAndUpdate: ({ id, update, options }: {
        id: any;
        update: UpdateQuery<T>;
        options?: QueryOptions<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findOneAndUpdate: ({ filter, update, options }: {
        filter: QueryFilter<T>;
        update: UpdateQuery<T>;
        options?: QueryOptions<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    create: (data: Partial<T>) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>>>;
}
export default Repository;
//# sourceMappingURL=repository.d.ts.map