
Project - ConsenSys 2018 Developer Program

What does the project do?
This project will serve as a proof of concept and to fulfill the requirements of the final project grading rubic.


How to set it up?




Description: Tuition Smart Contract to help teachers and students manage class registration, payments and also serves as a record of grades

User Stories

The roles and use cases for the tuition contract

Contract Owner
The owner of the contract will serve as the administrator of the course. The contract owner will be the only one who has the permission to stop/resume the contract and will act as the official mediator if any dispute arises between student and teacher. After the contract is deployed, the owner will need to assign a teacher address to the contract.

Teacher
The person conducting the course is called the teacher. The teacher will be able to set the class name and tuition fee at the preparation stage. Uppn the completion of the course , the teacher will be able to grade the students registered to the course. The teacher is also responsible for triggering the movement of the contract stages. The teacher is able withdraw the tuition fee paid by the students at the end of the course.

Student
The student can register for courses by entering a name and paying the tuition fee to the contract. At the end of the course, students are able to rate the teacher's performance. Students are able to withdraw the tuition fee they paid when the contract is stopped. 




Tuition Contract Stages


    Preparation
    1. Owner Assigns Teacher - SetTeacher() Done
    2. Teacher set Course Info / Course Fee - SetClassName(), SetTuitionFee() 
    3. Transit to next stage - PublishClass()
    

    Registration
    1. Student Register for class by paying eth for class fee -RegisterTuition() 
    2. Teacher can close registration or if max students reached -CloseRegistration()


    Started
    1. Teacher can end the class - endClass()

    Ended
    1. Teacher assigns grade to student -recordGrade()

    Review
    1. Students give teacher rating - giveTeacherRating()
    2. Teacher can collect tuition fee -withdrawFees()
   

   Emergency stop - all stages
   1. Owner can stop contract
   2. Owner can resume contract
   3. Students can withdraw funds when contract is stopped - emergencyWithdraw()


Notes

I hardcoded the max students per tuition contract to 2. After two students have registered at the registration stage , the contract stage will automatically be transited to started


Testing

The test cases can be found in the test\testTuition.js

I have wrote the test to show how the tuition contract would work.

Below is the sample results from truffle test in the console

Contract: Tuition Contract
    ✓ Setup of tuition contract by owner
    ✓ Set Teacher (109ms)
    ✓ Set Tuition Fee (114ms)
    ✓ Set Class Name (229ms)
    ✓ Publish Class (79ms)
    ✓ Register Tuition for Student1 (156ms)
    ✓ Register Tuition for Student2 with less than tuition fee - will fail to register (96ms)
    ✓ Register Tuition for Student2 (202ms)
    ✓ Register Tuition for Student3 but will fail to register (49ms)
    ✓ Check Stage = Started as max students = 2
    ✓ Check FeeCollected = 4 (81ms)
    ✓ Teacher sets stage to ended (112ms)
    ✓ Emergency Stop by Owner (111ms)
    ✓ Teacher assigns grade to studentOne but will fail as Contract is stopped (58ms)
    ✓ Emergency withdraw by studenttwo (208ms)
    ✓ Emergency withdraw by studenttwo second time which will fail (108ms)
    ✓ Contract Resumed by Owner (348ms)
    ✓ Teacher assigns grade to studentOne (196ms)
    ✓ Teacher sets stage to Review (245ms)
    ✓ Teacher withdraws FeeCollected (1126ms)
    ✓ student1 assign rating to teacher (118ms)


There are some test cases like checking for repeated withdrawals, registering with ether less than the require tuition fee. 