/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51PWJLRRr7OGgTvDJ3KBa3eBdsHapMI6QyiVyJCMqArAbCm2FemRVo3EvT0XtC2EnZGhODntg0wweNqgpxIFVYMPG00BLl9H7RD',
  );

  try {
    //1. get checkout session from the API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    //2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
