const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        const conn = await mongoose.connect(process.env.DATABASE)
        console.log(`connected to mongoDB database: ${conn.connection.host}`)
    } catch(error){
        console.log(`error connecting to mongodb database: ${error}`)
    }
}

module.exports = connectDB