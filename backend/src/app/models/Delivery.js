import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        paranoid: true,
        deletedAt: 'canceled_at',
      }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(model.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });

    this.belongsTo(model.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}

export default Delivery;
