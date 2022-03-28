// types
import { MinMaxRuleFunctionType } from '../rule-function-type';
import { ValidationResultType } from '../validation-result-type';

// FUNCTION
export const isPasswordCorrectLength: MinMaxRuleFunctionType = (
  fieldName: string,
  minLength: number,
  maxLength: number,
  message?: string
) => (value: string): ValidationResultType => {
  // Valid
  const valid = (value.length >= minLength
    && value.length <= maxLength);

  // Message
  let resultMessage = '';
  if (!valid) {
    if (message) {
      resultMessage = message;
    } else {
      resultMessage = `Поле '${fieldName}' должно содержать больше ${minLength} и меньше ${maxLength} символов.`;
    }
  }

  // RETURN
  return {
    valid,
    message: resultMessage
  };
};
