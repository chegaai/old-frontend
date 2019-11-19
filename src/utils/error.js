import { Notify } from 'quasar';


export const withErrorHandling = callback => async (payload) => {
  try {
    await callback(payload);
  } catch (error) {
    Notify.setDefaults({
      position: 'top-right',
      timeout: 2500,
      textColor: 'white',
    });
    const message = 'Algum erro aconteceu';
    Notify.create({ message });
    console.log('* Error tracked', JSON.stringify(error, null, 2));
  }
};
