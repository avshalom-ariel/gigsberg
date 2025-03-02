const {mongoose} = require('mongoose');


const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    }
})

const MongoProduct = mongoose.model("Product", productSchema);
module.exports = MongoProduct;
