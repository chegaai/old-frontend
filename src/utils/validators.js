export const notEmpty = (value) => {
  const possibilities = {
    string: v => (!!v && !!v.length),
    object: (v) => {
      if (!v) return false;
      if (Object.values(v).includes('')) return false;
      return true;
    },
    undefined: () => false,
  };
  const type = typeof value;
  return possibilities[type] && possibilities[type](value);
};

export const isUrl = (value) => {
  const regex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  return regex.test(value);
};

export const onlyAllowUntilNumber = (limit = 100) => (value) => {
  const valueWithoutComma = Number(String(value).replace(/,/g, '.'));
  return valueWithoutComma <= limit;
};

export const onlyNumber = (value) => {
  const possibilities = {
    number: () => true,
    string: (v) => {
      const val = v.replace('.', '').replace(/,/, '.');
      return (!!Number(val) && /\d/.test(val));
    },
    undefined: () => false,
  };
  const type = typeof value;
  return possibilities[type] && possibilities[type](value);
};
