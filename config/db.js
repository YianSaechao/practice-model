// connect mongoose to the db

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://yianlsaechao:${process.env.MONGO_PASS}@cluster0.6tjf6dw.mongodb.net/Company?retryWrites=true&w=majority`
// `mongodb+srv://yianlsaechao:${procesrss.env.MONGO_PASS}@cluster0.6tjf6dw.mongodb.net/?retryWrites=true&w=majority`

console.log(connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// log when connected

mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});