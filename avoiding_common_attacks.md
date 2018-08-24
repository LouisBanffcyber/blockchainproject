Contract Safety and Security


Logic Bugs

Comprehensive, automated unit testing
Follow coding standards and best practices
Avoid complex reules and implementation



Recursive Calls
Reentrancy attacks
Because this contract uses transfer() instead of call.value() , there’s no risk of reentrancy attacks since the transfer function only allows to use 23.000 gas which you can only use for an event to log data and throws on failure.

Use the Checks-Effects-Interactions Pattern

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


Integer Arithmetic overflow
Use of library for safe operations


Beware of accepting user input
Assume users will input data that you do not expect
Sanitize and check input
Require Statements

Powerful contract administrators can be a risk

TX Origin Problem
Use of msg.sender rather than tx.origin


