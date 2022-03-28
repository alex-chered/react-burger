// types
import { RuleType } from './rule-type';

// TYPE
export type RuleFunctionType = (
  fieldName: string,
  message?: string
) => RuleType;

export type MinMaxRuleFunctionType = (
  fieldName: string,
  min: number,
  max: number,
  message?: string
) => RuleType;
