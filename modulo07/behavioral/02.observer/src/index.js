import Marketing from "./observers/marketing.js";
import Payment from "./events/payment.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Shipment from "./observers/shipment.js";


const subject = new PaymentSubject();
const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);
payment.creditCard({username: 'halister', id: Date.now()});

subject.unsubscribe(marketing);

payment.creditCard({ username: 'mariazinha', id: Date.now()})