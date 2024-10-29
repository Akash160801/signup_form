const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://akash:Mongodb16up@cluster0.bvg69au.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Mongodb connected')
  })
  .catch((err) => {
    console.log('Coonection failed', err)
  })

/*  Creating Schema */

const createUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const collection = mongoose.model('collection', createUser)
module.exports = collection
