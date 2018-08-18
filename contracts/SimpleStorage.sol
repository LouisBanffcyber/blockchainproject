pragma solidity ^0.4.18;

// contract SimpleStorage {
  
// //Variables
//     address public owner = msg.sender;
//     string ipfsHash;
     

//     function set(string x) public {
//         ipfsHash = x;
//     }

//     function get() public view returns (string) {
//         return ipfsHash;
//     }
    

// }

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}