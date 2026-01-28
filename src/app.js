import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

/**
 * Routes Imported
 */
import userRoutes from "./modules/user/user.route.js";
import AuthRoutes from "./modules/auth/auth.routes.js";
import AdminRoutes from "./modules/admin/admin.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

if(env.nodeEnv == 'development') {
    app.use(morgan("dev"));
}

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        environment: env.nodeEnv,
    });
});

/**
 * routes defined as per need
 */
app.use('/api/users', userRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;