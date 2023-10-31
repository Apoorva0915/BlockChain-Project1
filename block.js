const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;

    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now(); //00cdef ,00
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

const block1 = new Block({
  hash: "0xacb",
  timestamp: "2/09/22",
  prevHash: "0xc12",
  data: "hello",
});

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
// console.log(result);
// //console.log(block1);
module.exports = Block;












// import  Genesis_Data  from "./config.js";
// import cryptoHash from "./crypto-hash.js";

// class Block {
//     constructor({ timestamp, prevHash, Hash, data, nonce, difficulty }) {
//       this.timestamp = timestamp;
//       this.prevHash = prevHash;
//       this.Hash = Hash;
//       this.data = data;
//       this.nonce = nonce;
//       this.difficulty = difficulty;
//     }
//     static genesis(){
//         return new this(Genesis_Data);
//     }
//     static mineBlock({prevBlock,data}){
//         let Hash,timestamp;
//         const prevHash=prevBlock.Hash;
//         let {difficulty}=prevBlock;
         
//         let nonce=0;
//         do{
//             nonce++;
//             timestamp=Date.now();
//             Hash=cryptoHash(timestamp,prevBlock,data,nonce,difficulty)
//         }
//         while(Hash.substring(0,difficulty)!=="0".repeat(difficulty));
//         return new this({
//         timestamp,
//         prevHash,
//         data,
//         nonce,
//         difficulty,
//         Hash
//         })
//     }
// }

// const block1= new Block({timestamp:"29/10/23",prevHash:"0xacb",Hash:"0xc12",data:"hello"});
// const block2= new Block({timestamp:"30/10/23",prevHash:"0xc12",Hash:"0ac24",data:"world"});
// // console.log(block1);
// // console.log(block2);

// // const genesisBlock= Block.genesis()
// // console.log(genesisBlock);

// // const result =Block.mineBlock({prevBlock:block1, data:"block2"});
// // console.log(result);

// export default Block
