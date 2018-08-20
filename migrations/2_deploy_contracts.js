var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};

var Tuition = artifacts.require("./Tuition.sol");

module.exports = function(deployer) {
  deployer.deploy(Tuition);
};
