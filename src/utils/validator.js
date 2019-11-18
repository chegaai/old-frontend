export const validate = (context, fields) => new Promise((resolve) => {
  context.$nextTick(() => {
    const errors = { hasError: () => false };
    fields.forEach((element) => {
      if (context.$refs[element]) {
        context.$refs[element].validate();
        if (context.$refs[element].hasError) errors[element] = true;
      }
    });

    if (Object.values(errors).includes(true)) {
      errors.hasError = () => true;
    }

    resolve(errors);
  });
});
