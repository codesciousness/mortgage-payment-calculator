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
const mongodb_1 = require("mongodb");
const loans_1 = __importDefault(require("./loans"));
require("dotenv/config");
// Connection URL
const url = process.env.MONGODB_URI;
// Database Name
const dbName = process.env.DB_NAME;
class MongoDB {
    constructor() {
        this.client = new mongodb_1.MongoClient(url);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('Successfully connected to database');
                this.db = this.client.db(dbName);
                this.loans = new loans_1.default(this.db);
            }
            catch (err) {
                console.log('Connection to database failed:' + err);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
}
exports.default = new MongoDB();
//# sourceMappingURL=mongo.js.map