"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const get_1 = __importDefault(require("./routes/get"));
const update_1 = __importDefault(require("./routes/update"));
const post_1 = __importDefault(require("./routes/post"));
const delete_1 = __importDefault(require("./routes/delete"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
};
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/', get_1.default);
app.use(update_1.default);
app.use(post_1.default);
app.use(delete_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
