import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'delivery_people',
        paranoid: true,
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
