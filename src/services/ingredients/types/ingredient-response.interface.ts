// Ingredient type that we get in a server response
export interface IngredientsResponseInterface {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  // eslint-disable-next-line camelcase
  image_mobile: string,
  // eslint-disable-next-line camelcase
  image_large: string,
  __v: number
}
