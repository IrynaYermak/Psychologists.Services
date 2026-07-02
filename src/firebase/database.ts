import app from "./config";
import { getDatabase } from "firebase/database";

const database = getDatabase(app);

export default database;
