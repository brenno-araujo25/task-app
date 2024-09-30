import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(8);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        tableName: 'users'
    });

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
    return User;
};
