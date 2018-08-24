Design Patterns used


Withdrawl Pattern

In the tuition contract, there are only 2 ways in which funds can be taken out of the contract. The two functions were designed so that the users will not be able to specify how much they could withdraw, instead it is somewhat predetermined. For example , the student can only withdraw the tuitionfee paid when registering for the class. 

The first method can only be used by the teacher(using the onlyTeacherModifier) and only at the Contract Review Stage

    function withdrawFees() public onlyTeacher notStopped atStage(Stages.Review){
        
        uint amount = feeCollected;
        feeCollected = 0;
        msg.sender.transfer(amount);

    }

The second method is the emergencyWithdraw function used by students when the contract has been stopped by the owner.

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


Restricting Access

To make sure that only authorized people are allow to make modification o the smart contract's state, the restricting access pattern is used in two ways.

First some of the contracts function have been declared as internal, this ensures that the functions can only be called from within the current contract

    function setStageToRegistration() internal atStage(Stages.Preparation) transitionNext{}


Function modifiers are used to check that a function will execute when called from a certain address.

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        require(msg.sender == owner, "Ony onlyAuthorized Owner");
        _;
    }




State Machine

The state machine design pattern is used to control the different behaviours throughout the life cycle of the tuition contract. It a way, its a more complex form of the restrict access design pattern. A combination of function modifiers and visiblity is used to implement the state machine. In the tuition contract, the teacher can only withdraw the funds when the contract stage is at review stage. 

 /*
    State Machine Design for Tuition Contract
    Stages of tuition
    */
    enum Stages {
        Preparation,
        Registration,
        Started,
        Ended,
        Review
    }

    //Initialize Preparation Stage
    Stages public stage = Stages.Preparation;

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

    // This modifier goes to the next stage
    // after the function is done.
    modifier transitionNext()
    {
        _;
        nextStage();
    }


Circuit Breaker / Emergency Stop

The circuit breaker is implemented in the tuition contract. The owner of the contract is able to stop and resume the contract through the circuit breaker. This is used as a way to pause the contract so that the students can use the emergencywithdraw function to get their tuition fee out.

/*
    Circuit Breaker Design for Tuition Contract
    */
    bool public isStopped = false;
    
    modifier notStopped {
        require(!isStopped);
        _;
    }
    
    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        require(msg.sender == owner, "Ony onlyAuthorized Owner");
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }
    