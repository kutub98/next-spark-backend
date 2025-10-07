"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(user);
});
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(userId);
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield userQuery.modelQuery;
    const metaData = yield userQuery.countTotal();
    return {
        meta: metaData,
        data: result,
    };
});
const updateUserById = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(userId);
    return result;
});
exports.UserService = {
    createUser,
    findUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
