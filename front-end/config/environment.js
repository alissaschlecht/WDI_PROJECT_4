module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/daywithAlex",
  secret: process.env.SECRET || "isntpassportfun"
};
