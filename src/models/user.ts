import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/databaseConfig';

interface UserAttributes {
  id: number;
  username: string;
  email:string;
  password: string;
  role: 'Client' | 'Freelancer';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!:string;
  public password!: string;
  public role!: 'Client' | 'Freelancer';

  public static associate(models: any) {
    User.hasMany(models.Project, { foreignKey: 'userId' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Client', 'Freelancer'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
