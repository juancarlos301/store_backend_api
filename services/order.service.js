const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class OrderService {
  constructor() {}

  async create(data) {
    const NewOrder = await models.Order.create(data);
    return NewOrder;
  }

  async addItem(data) {
    const NewItem = await models.OrderProduct.create(data);
    return NewItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: "customer",
          include: ["user"]
        }
      ]
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        "items"
      ]
    });
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
