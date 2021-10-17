export const isClassProp = (prop) => prop === 'className';

export const isEventProp = (prop) => {
  return prop.startsWith('on');
};

export const isPlainText = (value) => typeof value === 'string' || typeof value === 'number';
