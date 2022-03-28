// types
import { RuleFunctionType } from '../rule-function-type';
import { ValidationResultType } from '../validation-result-type';

// FUNCTION
export const areValidChacters: RuleFunctionType = (
  fieldName: string,
  message?: string
) => (value: string): ValidationResultType => {
  // Valid
  const valid = /^[A-Za-z0-9!.]+$/.test(value);

  // Message
  let resultMessage = '';
  if (!valid) {
    if (message) {
      resultMessage = message;
    } else {
      resultMessage = `В поле '${fieldName}' можно использовать только буквы, цифры и смиволы: '.', '_' и '!'`;
    }
  }

  // RETURN
  return {
    valid,
    message: resultMessage
  };
};
