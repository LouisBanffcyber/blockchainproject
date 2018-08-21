pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Tuition.sol";

contract TestTuition {

    function testSettingAnOwnerDuringCreation() public {
        Tuition tuition = new Tuition();
        Assert.equal(tuition.owner(), this, "An owner is different than a deployer");
    }
    function testSettingAnOwnerOfDeployedContract() public {
        Tuition tuition = Tuition(DeployedAddresses.Tuition());
        Assert.equal(tuition.owner(), msg.sender, "An owner is different than a deployer");
    }

   
}


