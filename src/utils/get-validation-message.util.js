export const getMinMessage = (fieldName, length) => `${fieldName} must be at least ${length} characters.`;
export const getMaxMessage = (fieldName, length) => `${fieldName} must not be longer than ${length} characters.`;
export const getRequiredMessage = fieldName => `${fieldName} is required.`;
