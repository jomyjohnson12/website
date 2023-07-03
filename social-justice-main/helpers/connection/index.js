const mongoose = require('mongoose')
const MONGO_URL = "mongodb://localhost/socialJustice"
try {
    mongoose.connect(MONGO_URL).then(() => {
        console.log(`Mongoose Connected`);
    })
} catch (error) {
    console.log(error);
}

let db = mongoose.connection

module.exports = db