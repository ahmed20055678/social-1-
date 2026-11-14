"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    model;
    constructor(model) {
        this.model = model;
    }
    findOne = async ({ filter, options = {} }) => {
        return await this.model.findOne(filter, null, options);
    };
    findById = async ({ id, options = {} }) => {
        return await this.model.findById(id, null, options);
    };
    findByIdAndUpdate = async ({ id, update, options = {} }) => {
        return await this.model.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
            ...options
        });
    };
    findOneAndUpdate = async ({ filter, update, options = {} }) => {
        return await this.model.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
            ...options
        });
    };
    create = async (data) => {
        return await this.model.create(data);
    };
}
exports.default = Repository;
//# sourceMappingURL=repository.js.map