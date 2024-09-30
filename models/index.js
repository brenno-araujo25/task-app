import { Sequelize } from "sequelize";
import config from "../config/config.js";
import UserModel from "./user.js";
import TaskModel from "./task.js";

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize);
db.Task = TaskModel(sequelize, Sequelize);

db.User.hasMany(db.Task, { foreignKey: "userId", onDelete: "CASCADE" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

export default db;