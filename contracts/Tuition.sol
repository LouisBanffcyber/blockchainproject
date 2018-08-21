pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Tuition {
using SafeMath for uint256;

    //Stages of tuition
    enum Stages {
        Preparation,
        Registration,
        Started,
        Ended,
        Review
    }

    //This is the current stage
    Stages public stage = Stages.Preparation;

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
    address public owner;
    string public className;

    uint256 public studentCount;
    uint256 public maxStudents = 2;
    uint256 public tuitionFee;
    uint256 public feeCollected;
    uint256 result;
    address[] public students;
    bool isStopped = false;
    
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
    
    function emergencyWithdraw() public onlyWhenStopped returns(bool) {
        // Emergency withdraw happening here
        //Only Students who registered can withdraw
        //Student can only withdraw 
        
        //student have not withdraw
        if(studentInfo[msg.sender].refunded != true){
            studentInfo[msg.sender].refunded = true;
            feeCollected = SafeMinus(feeCollected,tuitionFee);
            msg.sender.transfer(tuitionFee);
            return true;
                
        }
        return false;
        
        
    }
    


    struct Student {
        string studentName;
        uint256 teacherRating;
        uint256 grade;
        bool refunded;
    }
    //Constructor 
    function Tuition() public{
        owner = msg.sender;
    }
    
    function setClassName(string _className) public onlyTeacher atStage(Stages.Preparation) {
        className = _className;
        
    }
    
    function setTeacher(address _teacher) public onlyAuthorized atStage(Stages.Preparation){
        teacher = _teacher;
        
    }
    
    function setTuitionFee(uint256 _tuitionFee )public onlyTeacher atStage(Stages.Preparation) {
        if(_tuitionFee > 0) {
            tuitionFee = _tuitionFee;
        }else{
            tuitionFee = 1 ether;
        }
    }
    
    function publishClass() public onlyTeacher atStage(Stages.Preparation){
         require(tuitionFee > 0);
         setStageToRegistration();
    }
    function endClass() public onlyTeacher atStage(Stages.Started){
        setStageToStarted();
    }
    
    function reviewClass() public onlyTeacher atStage(Stages.Ended){
        setStageToReview();
    }
    
    
    function() public payable {
    // this function enables the contract to receive funds
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function SafeAdd(uint256 a, uint256 b) internal returns (uint256) {
      result = 0;
      result = a.add(b);
      return result;
    }
    
    function SafeMinus(uint256 a, uint256 b)internal returns (uint256) {
      result = 0;
      result = a.sub(b);
      return result;
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
    
    function registerTuition(string _studentName) public payable notStopped atStage(Stages.Registration){
        require(studentCount<maxStudents);
        require(!checkStudentExists(msg.sender), "Student already registered");
        require(msg.value >= tuitionFee, "Tuition Fee is 1 Ether");
        
        uint256 receivedAmt = msg.value;
        uint256 ethToReturn = SafeMinus(receivedAmt, tuitionFee);
        
        
        //Store student into student array
        students.push(msg.sender);
        studentInfo[msg.sender].studentName = _studentName;
        studentCount ++;
        
        feeCollected = SafeAdd(feeCollected,tuitionFee);
        
        
        if(ethToReturn > 0){
            msg.sender.transfer(ethToReturn);
            ethToReturn = 0;
            
        } 
        
        if(studentCount == maxStudents){
            setStageToStarted();
        }
        
    }
    
    function closeRegistration() public onlyTeacher atStage(Stages.Registration){
        setStageToStarted();
    }
    
    function recordGrade(address studentAddress,uint256 _grade) public onlyTeacher atStage(Stages.Ended){
        
        studentInfo[studentAddress].grade = _grade;
        
    }
    
    function giveTeacherRating(uint256 rating) public atStage(Stages.Review) returns (bool) {
        //msg.sender must be a student and have not refunded fees
         if(studentInfo[msg.sender].refunded == false){
             studentInfo[msg.sender].teacherRating =rating;
             return true;
         }
         return false;
    }
  
   

    function withdawFees() public onlyTeacher notStopped atStage(Stages.Review){
        
        uint amount = feeCollected;
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        feeCollected = 0;
        msg.sender.transfer(amount);

    }

    function setStageToRegistration() internal atStage(Stages.Preparation) transitionNext{
        
    }

    function setStageToStarted() internal atStage(Stages.Registration) transitionNext{

    }

    function setStageToEnded()  internal atStage(Stages.Started) transitionNext{

    }

    function setStageToReview()  internal atStage(Stages.Ended) transitionNext{

    }











}