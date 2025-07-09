let IS_PROD = true;

const server = IS_PROD
  ?"https://amazon-backend-i8vp.onrender.com"
  :"http://localhost:5000"  ;

export default server;