
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testcluster.ayixn.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const JWT_SECRET = process.env.JWT_SECRET
module.exports = { MONGODB_URI, JWT_SECRET };

