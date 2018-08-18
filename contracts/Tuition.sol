pragma solidity ^0.4.18;

contract Tuition {

    //Stages of tuition
    enum Stages {
        Registration,
        Started,
        Ended,
        Review
    }

    //This is the current stage
    Stages public stage = Stages.Registration;

    uint public creationTime = now;

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


    //Address of the teacher
    address public teacher;
    string public className;

    uint256 public studentCount;
    uint256 public maxStudents = 2;
    uint256 public tuitionFee;
    uint256 public feeCollected;
    address[] public students;

    struct Student {
        string studentName;
        uint256 teacherRating;
        uint256 grade;
    }
    //Constructor 
    
    constructor(uint _tuitionFee, string _className) public {
        
        teacher = msg.sender;
        className = _className;
        if(_tuitionFee > 0) {
            tuitionFee = _tuitionFee;
        }else{
            tuitionFee = 1 ether;
        }
    }
    function() public payable {
    // this function enables the contract to receive funds
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //The address of the student map to the structure
    mapping(address => Student) public studentInfo;

    modifier onlyTeacher{
        require(msg.sender == teacher, "Only Teacher");
        _;

    }
 

    function checkStudentExists(address student) public view returns(bool){
        for(uint256 i = 0; i < students.length; i++){
            if(students[i] == student) return true;
        }
        return false;
    }

    event registerStudent(address student);
    
    function registerTuition(string _studentName) public payable atStage(Stages.Registration){
        require(studentCount<maxStudents, "Max num of students");
        require(!checkStudentExists(msg.sender), "Student already registered");
        require(msg.value >= tuitionFee, "Tuition Fee is 1 Ether");
        uint256 ethToReturn = msg.value - tuitionFee;
        //Store student into student array
        students.push(msg.sender);
        studentInfo[msg.sender].studentName = _studentName;
        studentCount ++;
        feeCollected += tuitionFee;
        if(ethToReturn > 0){
            msg.sender.transfer(ethToReturn);
        } 
        
        if(studentCount == maxStudents){
            setStageToStarted();
        }
        
    }
    
    function closeRegistration() public onlyTeacher atStage(Stages.Registration){
        setStageToStarted();
    }
  
   

    function withdawFees() public onlyTeacher atStage(Stages.Review){
        
        uint amount = feeCollected;
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        feeCollected = 0;
        msg.sender.transfer(amount);

    }

    function setStageToStarted() internal atStage(Stages.Registration) transitionNext{

    }

    function setStageToEnded()  internal atStage(Stages.Started) transitionNext{

    }

    function setStageToReview()  internal atStage(Stages.Ended) transitionNext{

    }











}