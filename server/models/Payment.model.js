const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({

})

const Payment = mongoose.model('Payment', PaymentSchema)

module.exports = Payment