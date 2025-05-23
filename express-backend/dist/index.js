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
const redis_1 = require("redis");
const cors_1 = __importDefault(require("cors"));
const clinet = (0, redis_1.createClient)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/sent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ;
    const { userId, problemId, message } = req.body;
    yield clinet.lPush("responses", JSON.stringify({ userId, problemId, message }));
    res.json({
        message: 'Successfully send'
    });
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield clinet.connect();
            app.listen(3004, () => {
                console.log("listing on port number 3004");
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
startServer();
