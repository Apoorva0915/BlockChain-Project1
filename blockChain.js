const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain is not longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
      const lastDifficulty = chain[i - 1].difficulty;
      const realLastHash = chain[i - 1].hash;

      if (prevHash !== realLastHash) return false;

      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validatedHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }
}

// const blockchain = new Blockchain();
// blockchain.addBlock({ data: "Block1" });
// blockchain.addBlock({ data: "Block2" });
// const result = Blockchain.isValidChain(blockchain.chain);
// console.log(blockchain.chain);
// console.log(result);
// //console.log(blockchain);
module.exports = Blockchain;




















// import Block from "./block.js";
// import cryptoHash from "./crypto-hash.js";

// class BlockChain {
//     constructor() {
//       this.chain = [Block.genesis()];
//     }
  
//     addBlock({ data }) {
//       const newBlock = Block.mineBlock({
//         prevBlock: this.chain[this.chain.length - 1],
//         data,
//       });
//       this.chain.push(newBlock);
//     }
 
//     replaceChain(chain){
//         if(chain.length<=this.chain.length){
//             console.error("The incoming chain is not longest");
//           return;
//         }
//         if(!BlockChain.isValidChain(chain)){
//             console.error("The incoming chain is not valid");
//             return;
//         }
//         this.chain=chain;
//     }



//  static isValidChain(chain) {
//     if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
//       return false;
//     }
//     for (let i = 1; i < chain.length; i++) {
//       const { timestamp, prevHash, Hash, data, nonce, difficulty  } = chain[i];
//     //   const lastDifficulty = chain[i - 1].difficulty;
//       const realLastHash = chain[i - 1].Hash;

//       if (prevHash !== realLastHash) return false;

//       const validatedHash = cryptoHash(
//         timestamp,
//         prevHash,
//         data,
//         nonce,
//         difficulty
//       );
//       if (Hash !== validatedHash) return false;
//     //   if (Math.abs(lastDifficulty - difficulty) > 1) return false;
//     }
//     return true;
//   }
// }

// const Blockchain=new BlockChain();
// Blockchain.addBlock({data:"Block1"})
// // Blockchain.addBlock({data:"Block2"})
// const result= BlockChain.isValidChain(Blockchain.chain);
// console.log(Blockchain.chain)
// console.log(result);
// // console.log(Blockchain);
// export default BlockChain



// // class BlockChain {
// //   constructor() {
// //     this.chain = [Block.genesis()];
// //   }

// //   addBlock({ data }) {
// //     const newBlock = Block.mineBlock({
// //       prevBlock: this.chain[this.chain.length - 1],
// //       data,
// //     });
// //     this.chain.push(newBlock);
// //   }

// //   replaceChain(chain) {
// //     if (chain.length <= this.chain.length) {
// //       console.error("The incoming chain is not longer");
// //       return;
// //     }
// //     if (!Blockchain.isValidChain(chain)) {
// //       console.error("The incoming chain is not valid");
// //       return;
// //     }
// //     this.chain = chain;
// //   }

// //   static isValidChain(chain) {
// //     if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
// //       return false;
// //     }
// //     for (let i = 1; i < chain.length; i++) {
// //       const { timestamp, prevHash, Hash, nonce, difficulty, data } = chain[i];
// //       const lastDifficulty = chain[i - 1].difficulty;
// //       // const realLastHash = chain[i - 1].Hash;

// //       // if (prevHash !== realLastHash) return false;

// //       const validatedHash = cryptoHash(
// //         timestamp,
// //         prevHash,
// //         nonce,
// //         difficulty,
// //         data
// //       );
// //       if (Hash !== validatedHash) return false;
// //       // if (Math.abs(lastDifficulty - difficulty) > 1) return false;
// //     }
// //     return true;
// //   }
// // }