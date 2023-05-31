export default class Payment {
    constructor(paymentSubject) {
        this.paymentSubject = paymentSubject
    }

    creditCard(paymentData) {
        console.log(`\na payment ocurred from ${paymentData.username}`);
        this.paymentSubject.notify(paymentData)
    }
}