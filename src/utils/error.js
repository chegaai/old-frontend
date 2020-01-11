export const withErrorHandling = callback => async (payload) => {
  try {
    return await callback(payload);
  } catch (error) {
    console.log('* Error tracked', error);
    return {
      data: null,
      error,
    };
  }
};
