import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/databaseConfig';

interface ProjectTagAttributes {
  id: number;
  name: string;
}

interface ProjectTagCreationAttributes extends Optional<ProjectTagAttributes, 'id'> {}

class ProjectTag extends Model<ProjectTagAttributes, ProjectTagCreationAttributes> implements ProjectTagAttributes {
  public id!: number;
  public name!: string;

  public static associate(models: any) {
    ProjectTag.hasMany(models.Project, { foreignKey: 'tagId' }); // Association to Project
  }
}

ProjectTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProjectTag',
  }
);

export default ProjectTag;
