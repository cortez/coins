import mongoose from 'mongoose'

const connect = async () => {
    mongoose.connect(process.env.DB_CONNECTION)
}

export default connect