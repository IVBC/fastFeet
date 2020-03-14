import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { deliverymanExists, product, recipientExists } = data;

    await Mail.sendMail({
      to: `${deliverymanExists.name} <${deliverymanExists.email}>`,
      subject: 'Nova entrega disponível.',
      template: 'newDelivery',
      context: {
        deliveryman: deliverymanExists.name,
        product,
        recipient: recipientExists.name,
      },
    });
  }
}

export default new NewDelivery();
