module.exports = {
  db: {
      production: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/startop-prod",
      development: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/startop-dev",
  }
};
