const crypto = require("crypto");
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputs.sort().join("")); //helloworld ,worldhello
  return hash.digest("hex");
};

//result = cryptoHash("world", "hello");
module.exports = cryptoHash;
//console.log(result);







// import { createHash } from "crypto";
// const cryptoHash=(...inputs)=>{
//     const hash=createHash("sha256")
//     hash.update(inputs.sort().join(""))
//     return hash.digest("hex")
// }

// let result=cryptoHash("hello","world");
// // console.log(result);

// export default cryptoHash;
