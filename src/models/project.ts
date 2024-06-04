import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/databaseConfig';


interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  userId: number;
  tagId: number; 
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number;
  public tagId!: number;

  public static associate(models: any) {
    Project.belongsTo(models.User, { foreignKey: 'userId' });
    Project.belongsTo(models.ProjectTag, { foreignKey: 'tagId' }); // Association to ProjectTag
  }
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
  },
  {
    sequelize,
    modelName: 'Project',
  }
);

export default Project;
