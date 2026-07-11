const { dotenv } = require("dotenv");
dotenv.config();
const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 3000),
};
module.exports = { env };
export {};
//# sourceMappingURL=env.js.map