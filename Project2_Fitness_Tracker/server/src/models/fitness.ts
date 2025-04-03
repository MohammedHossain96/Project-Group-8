import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FitnessAttributes {
  id: number;
  userId: number;
  cardio: number;
  weights: number;
  calories: number;
  date: Date;
}

interface FitnessCreationAttributes extends Optional<FitnessAttributes, 'id'> {}

export class Fitness extends Model<FitnessAttributes, FitnessCreationAttributes> implements FitnessAttributes {
  public id!: number;
  public userId!: number;
  public cardio!: number;
  public weights!: number;
  public calories!: number;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function FitnessFactory(sequelize: Sequelize): typeof Fitness {
  Fitness.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      cardio: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      weights: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      calories: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: 'fitness',
      sequelize,
    }
  );

  return Fitness;
}
