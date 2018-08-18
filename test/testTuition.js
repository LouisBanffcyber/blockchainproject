var Tuition = artifacts.require("./Tuition.sol");

contract('Tuition', function(accounts) {

  it("...should store the value 89.", function() {
    return SimpleStorage.deployed().then(function(instance) {
      simpleStorageInstance = instance;

      return simpleStorageInstance.set(89, {from: accounts[0]});
    }).then(function() {
      return simpleStorageInstance.get.call();
    }).then(function(ipfsHash) {
      assert.equal(ipfsHash, 89, "The value 89 was not stored.");
    });
  });

});
