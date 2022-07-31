const env = require("dotenv");
env.config();

const fs = require("fs");
const path = require("path");

// 放入token key
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,"keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,"keys/public.key"));

module.exports = {
    APP_HOST,
    APP_PORT,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;