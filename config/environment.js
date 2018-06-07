const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/classes';
const port = process.env.PORT || 3000;


module.exports = {databaseURI, port};
