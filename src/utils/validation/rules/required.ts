// Custom types
import { RuleFunctionType } from '../rule-function-type';
import { ValidationResultType } from '../validation-result-type';

// FUNCTION
export const required: RuleFunctionType = (
  fieldName: string,
  message?: string
) => (value: string): ValidationResultType => {
  // Valid
  const valid = value.trim().length > 0;

  // Message
  let resultMessage = '';
  if (!valid) {
    if (message) {
      resultMessage = message;
    } else {
      resultMessage = `Поле '${fieldName}' не должно быть пустым.`;
    }
  }

  // RETURN
  return {
    valid,
    message: resultMessage
  };
};
