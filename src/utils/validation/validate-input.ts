// types
import { ValidationResultType } from './validation-result-type';
import { RuleType } from './rule-type';

// FUNCTION
export const validateInput = (
  value: string, validationRules: RuleType[]
): ValidationResultType => {
  //
  let valid = true;
  let message = '';

  for (let i = 0; i < validationRules.length; i += 1) {
    // Execute a rule
    const result = validationRules[i](value);
    // Get the property "valid"
    valid = result.valid;
    // Break the cycle, if it isn't valid
    if (!valid) {
      message = result.message;
      break;
    }
  }

  // RETURN
  return {
    valid,
    message
  };
};
