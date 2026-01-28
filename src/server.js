import './config/env.js'

import connectDb from './config/db.js';
import app from './app.js';
import { env } from './config/env.js';

const startServer = async() => {
    try {

        await connectDb();

        app.listen(env.port, () => {
            console.log(`Server is running on port: ${env.port}`);
        });

    } catch (error) {
        console.log('Error in starting server');
        console.log(error.message);
        process.exit(1);
    }
}

startServer();