// models
import { IngredientModel, OrderModel } from 'models';
// services
import { OrderResponseInterface } from 'services/orders';

// FUNCTION
export const convertRawOrdersToOrders = (
  orders: OrderResponseInterface[],
  ingredientsCollection: IngredientModel[]
): OrderModel[] => {
  // Create an empty array of orders
  const result: OrderModel[] = [];
  orders.forEach((order) => {
    let price = 0;
    // In this variable we will add found ingredients
    const ingredients: IngredientModel[] = [];
    order.ingredients.forEach((ingredientStr) => {
      // Find an ingredient by id
      const ingredientInStore = ingredientsCollection.find(
        (ingredient) => ingredient.id === ingredientStr
      );
      // If the ingredient is found, add one to our collection
      if (ingredientInStore) {
        ingredients.push(ingredientInStore);
        price += ingredientInStore.price;
      }
    });
    // Create a new order
    const newOrder: OrderModel = {
      id: order._id,
      orderNumber: order.number,
      name: order.name,
      creationDate: order.createdAt,
      status: order.status,
      price,
      ingredients
    };
    // Add the new order
    result.push(newOrder);
  });

  return result;
};
