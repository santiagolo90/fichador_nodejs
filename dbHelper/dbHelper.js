const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/sp', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/sp', 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error: ",err.message);
});

module.exports = mongoose;