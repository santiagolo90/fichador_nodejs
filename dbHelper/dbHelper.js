const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/sp', { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error: ",err.message);
});


/*
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,)
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error: ",err.message);
});
*/

module.exports = mongoose;