import Mail from '../../lib/Mail';

class CancellationDelivery {
  get key() {
    return 'CancellationDelivery';
  }

  async handle({ data }) {
    const { name, email, deliveryProblem } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Entrega cancelada.',
      template: 'cancellationDelivery',
      context: {
        deliveryman: name,
        product: deliveryProblem.delivery.product,
        description: deliveryProblem.description,
      },
    });
  }
}

export default new CancellationDelivery();
