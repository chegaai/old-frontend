export const withErrorHandling = callback => async (payload) => {
  try {
    return await callback(payload);
  } catch (error) {
    console.log('* Error tracked', JSON.stringify(error, null, 2));
    return {
      data: null,
      error,
    };
  }
};
