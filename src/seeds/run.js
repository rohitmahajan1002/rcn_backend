import mongoose from "mongoose";
import { env } from "../config/env.js";
import seedRBAC from "./rbac.seed.js";
import seedAdmin from "./admin.seed.js";

const run = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    await seedRBAC();
    await seedAdmin();

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

run();
