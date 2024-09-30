export default (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'in progress', 'completed'),
            defaultValue: 'pending'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'tasks'
    });
    
    return Task;
};