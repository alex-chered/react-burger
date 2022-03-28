// types
import { RuleFunctionType } from '../rule-function-type';
import { ValidationResultType } from '../validation-result-type';

// FUNCTION
export const isEmail: RuleFunctionType = (
  fieldName: string,
  message?: string
) => (value: string): ValidationResultType => {
  // Valid
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
  const valid = emailRegex.test(value);

  // Message
  let resultMessage = '';
  if (!valid) {
    if (message) {
      resultMessage = message;
    } else {
      resultMessage = `Поле '${fieldName}' должно содержать корректный email.`;
    }
  }

  // RETURN
  return {
    valid,
    message: resultMessage
  };
};
