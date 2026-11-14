
import userModel, { IUser } from "../../DB/model/user.model";
import Repository from "../../DB/repository/repository";

class UserRepository extends Repository<IUser> {

    constructor() {
        super(userModel);
    }

    findUserByEmail = async (
    email: string,
    options?: { isConfirmed?: boolean }
) => {
    return await this.findOne({
        filter: {
            email,
            ...(options?.isConfirmed !== undefined && {
                isConfirmed: options.isConfirmed
            })
        }
    });
}
    createUser = async (data: IUser) => {
        return await this.create(data);
    }

    findUserById = async (id: string) => {
        return await this.findById({ id });
    }

    updateUser = async (id: string, updateQuery: Partial<IUser>) => {
        return await this.findByIdAndUpdate({
            id,
            update: { $set: updateQuery }
        });
    }

    updateUserByEmail = async (email: string, value: Partial<IUser>) => {
        return await this.findOneAndUpdate({
            filter: { email },
            update: { $set: value }
        });
    }
}

export default new UserRepository();
