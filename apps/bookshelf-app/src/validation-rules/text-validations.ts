export function ruleFieldRequiredMinMax(filedName: string, minLength = 0, maxLength = 20): Array<unknown> {
  return [
    (value: string) => !!value || `${filedName} is required`,
    (value: string) => (value && value.length >= minLength) || `${filedName} must be more than ${minLength} characters`,
    (value: string) => (value && value.length <= maxLength) || `${filedName} must be less than ${maxLength} characters`,
  ]
}

export function ruleEmailRequiredAndValid(): Array<unknown>{
  return [
    (value: string) => !!value || 'E-mail is required',
    (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
  ]
}

export function ruleAtLeastOneUppercase(fieldName: string): Array<unknown> {
  return [
    (value: string) => (value && (value.match(/[A-Z]/g) || []).length > 0) || `${fieldName} must include at least one Uppercase letter`,
  ]
}

export function ruleAtLeastOneNumber(fieldName: string): Array<unknown> {
  return [
    (value: string) => (value && (value.match(/[0-9]/g) || []).length > 0) || `${fieldName} must include at least one Number`,
  ]
}

export function ruleSameAsField(fieldName: string, sameAsField: string, refValue: string): Array<unknown> {
  return [
    (value: string) => (value === refValue) || `${fieldName} must be same as ${sameAsField}`,
  ]
}


