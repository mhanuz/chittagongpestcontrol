import mongoose from "mongoose"

const Connection = async () => {
    const URL = `mongodb+srv://ceanuz66:chittagongpestcontrol@chittagongpestcontrol.hviumcx.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true})
        console.log('Databease connect successfully.')
    } catch(error) {
        console.log('Error while connecting with the database.',error);
    }
}

export default Connection;