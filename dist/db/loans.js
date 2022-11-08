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
Object.defineProperty(exports, "__esModule", { value: true });
class Loans {
    constructor(db) {
        this.collection = db.collection('loans');
    }
    findLoan(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLoan = yield this.collection.findOne({ email });
            return existingLoan;
        });
    }
    addLoan(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLoan = yield this.collection.insertOne(Object.assign(Object.assign({}, loan), { created: new Date().toUTCString(), lastUpdated: Date.now() }));
            return newLoan;
        });
    }
    updateLoan(loanId, loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedLoan = yield this.collection.updateOne({ loanId }, { $set: Object.assign(Object.assign({}, loan), { lastUpdated: Date.now() }) });
            return updatedLoan;
        });
    }
}
;
exports.default = Loans;
//# sourceMappingURL=loans.js.map