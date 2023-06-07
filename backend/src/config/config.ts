const config = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://1234:1234@cluster0.f68eejv.mongodb.net/myapp?retryWrites=true&w=majority',
    jwtSecret: process.env.JWT_SECRET || 'mysecret',
  };
  
  export default config;