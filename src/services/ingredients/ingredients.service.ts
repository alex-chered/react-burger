// services
import { AppSettingsService } from 'services/app-settings';
import { HttpBaseService } from 'services/base';
// models
import { IngredientModel } from 'models';
// aux.
import {
  IngredientsError,
  GetIngredientsResponseInterface
} from './types';
import {
  convertToIngredient
} from './utils';

// SERVICE
class IngredientsService extends HttpBaseService {
  // ingredients url
  private urlIngredients = '/api/ingredients';

  // -> GET INGREDIENTS
  public async getIngredients(): Promise<IngredientModel[]> {
    const defaultMessage = 'Не удалось загрузить данные.';

    try {
      const { data: response } = await this.axiosInstance.get<GetIngredientsResponseInterface>(
        this.urlIngredients
      );

      // We can get response, but response can contain no data
      if (!response.success) {
        throw new IngredientsError(defaultMessage);
      }

      // no data
      if (response.data.length === 0) {
        throw new IngredientsError('Нет данных');
      }

      // Get data from the response
      const result: IngredientModel[] = response.data.map(convertToIngredient);

      return result;
    } catch {
      // log errors.
      throw new Error(defaultMessage);
    }
  }
}

// Create the service instance
export const ingredientsService = new IngredientsService(
  AppSettingsService.getBaseUrl() // baseUrl
);
