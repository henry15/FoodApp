const mongo =require('mongoose');
const {Schema} = mongo;

const OrderSchema =  mongo.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    order_data:{
        type: Array,
        required: true
    }
})

module.exports = mongo.model('order', OrderSchema)