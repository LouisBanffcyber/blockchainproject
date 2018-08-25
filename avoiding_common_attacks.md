Contract Safety and Security


I've listed a couple of the common attacks and how I've defended against them

Logic Bugs

I've mitigated this by coming up with a comprehensive set of test cases that simulates the flow of how the tuition contact is supposed to work. Though I did not had the time to come up with more test for 'edge' cases. I tried to follow the solidity coding standard so that the code is easy to read. https://solidity.readthedocs.io/en/v0.4.21/layout-of-source-files.html#comments



Reentrancy attacks
Because this contract uses transfer() instead of call.value() , there’s no risk of reentrancy attacks since the transfer function only allows to use 23.000 gas which you can only use for an event to log data and throws on failure.


The Checks-Effects-Interactions Pattern was also used to avoid reentrancy attacks. Please see the code sample below

function emergencyWithdraw() public onlyWhenStopped {
        /*Emergency withdraw happening here
          Only Students who registered can withdraw
          Student can only withdraw once
        */
        require(checkStudentExists(msg.sender), "Must be a student who registered");
        require(studentInfo[msg.sender].refunded == false,"Refunded Already");
        studentInfo[msg.sender].refunded = true;
        feeCollected = SafeMinus(feeCollected,tuitionFee);
        msg.sender.transfer(tuitionFee);
     
    }


Integer Arithmetic overflow - Use of library for safe operations

I used the safemath library to handle this.

import"openzeppelin-solidity/contracts/math/SafeMath.sol";

function SafeAdd(uint256 a, uint256 b) internal returns (uint256) {
      result = 0;
      result = a.add(b);
      return result;
    }



Beware of accepting user input and assume users will input data that you do not expect

In the contract, i used require statements at the top of my functions to check the validity of inputs before executing the rest of the function. 

For the front end web app, there is no error checking on the inputs (I'm well aware of this, ideally there should be code to check the inputs at the front end before passing into the contract)


Powerful contract administrators can be a risk

I designed the contract so that the contract owner can step in as a mediator should there between a dispute between the teacher and students. Once the contract is paused, the students can withdraw the tuition fee from the contract, leaving the teacher with nothing. On the other hand, the teacher can only withdraw the tuition funds after the course is completed.


TX Origin Problem

tx.origin will always refer to the original address that made the original transaction (even if the contract you call, calls another, tx.origin will always refer to your address), while msg.sender refers to the address of the last caller to the current contract evaluating the transaction

Use of msg.sender rather than tx.origin for the functions concerning the transfer of eth

