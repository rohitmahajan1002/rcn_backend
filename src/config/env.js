import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ['PORT', 'MONGO_URI', 'NODE_ENV'];

requiredEnvVars.forEach((key) => { 
    if(!process.env[key]) {
        console.log(`Missing Environment Variable: ${key}`);
        process.exit(1);
    }
});

export const env = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
}