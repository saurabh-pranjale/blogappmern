const mongoose = require('mongoose')


const connect = () =>{
    mongoose.connect('mongodb://localhost:27017/logapp').then(() => console.log('MongoDB connected'))
      .catch((err) => console.error(err));
    
}

module.exports = connect