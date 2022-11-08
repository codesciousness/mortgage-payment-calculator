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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router/router"));
const mongo_1 = __importDefault(require("./db/mongo"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_mongo_1 = __importDefault(require("rate-limit-mongo"));
require("dotenv/config");
const app = (0, express_1.default)();
const { PORT = 4001, NODE_ENV = 'development' } = process.env;
const IN_PROD = NODE_ENV === 'production';
const corsOptions = {
    origin: IN_PROD ? ['https://mortgage-payment-calculator.projects.mycodefolio.com/'] :
        ['http://localhost:4001/', 'http://localhost:3000/'],
    credentials: true
};
// Start MongoDB
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongo_1.default.connect();
    });
}
;
start();
//Add middleware for rate limiting requests
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    store: new rate_limit_mongo_1.default({
        uri: process.env.MONGODB_URI,
        expireTimeMs: 15 * 60 * 1000,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    })
});
app.use(rateLimiter);
// Add middleware for handling CORS requests
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
// Serve static content in production
if (IN_PROD) {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
    app.set('trust proxy', true);
}
;
// Add middware for parsing request bodies
app.use(body_parser_1.default.json());
// Logging
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
// Use apiRouter
app.use(router_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../build/index.html'));
});
// Add code to start the server listening
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map