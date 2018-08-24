
Project - ConsenSys 2018 Developer Program

What does the project do?
This project will serve as a proof of concept and to fulfill the requirements of the final project grading rubic.

Description: Tuition Smart Contract to help teachers and students manage class registration, payments and also serves as a record of grades

User Stories

Contract Owner
The owner of the contract will serve as the administrator of the course. The contract owner will be the only one who has the permission to stop/resume the contract and will act as the official mediator if any dispute arises between student and teacher. After the contract is deployed, the owner will need to assign a teacher address to the contract.

Teacher
The person conducting the course is called the teacher. The teacher will be able to set the class name and tuition fee at the preparation stage. Uppn the completion of the course , the teacher will be able to grade the students registered to the course. The teacher is also responsible for triggering the movement of the contract stages. The teacher is able withdraw the tuition fee paid by the students at the end of the course.

Student
The student can register for courses by entering a name and paying the tuition fee to the contract. At the end of the course, students are able to rate the teacher's performance. Students are able to withdraw the tuition fee they paid when the contract is stopped. 


Tuition Contract Stages

Preparation
In this stage, the contract owner will assign a teacher to the contract.


Registration

Started

Ended

Review





Front End Web App

Classroom

Use cases

Teacher
1. Teacher to Create Classroom Contract - Done
2. Teacher to Add Classroom Metadata
3. Teacher to upload Files to Classroom (Storing Hash of documents in IPFS
4. Teacher can collect class fee after class ended - Done
5. Teacher can collect performance bonus after class end

Student
1. Student to register for class by paying class fee - Done
2. At the end of class, students will vote on teacher performance bonus
3. Student can withdraw from class before class starts


Class Stages
1. Registration
    Student can register for class - Pay Ether - Done
    Student can withdraw from class - Take back Ether
2. Ongoing
    No changes
3. Ended
    Teacher can withdraw fund - Basic
4. Review
    Student vote on teacher performance -> Determine bonus funds
    Student can withdraw back remainder of funds
    Teacher can withdraw bonus performance funds



    Stages

    Preparation
    1. Owner Assigns Teacher - SetTeacher() Done
    2. Teacher set Course Info / Course Fee - SetClassName(), SetTuitionFee() Done
    3. Teacher Upload Hashes of documents on IPFS

    Registration
    1. Student Register for class by paying eth for class fee -RegisterTuition() Done
    2. Teacher can close registration or if max students reached -CloseRegistration() Done


    Started
    1. 
    2. Students can view hashes of documents on IPFS

    Ended
    1. Teacher assigns grade to student -recordGrade() Done
    

    Review
    1. Students vote on teacher performance upon 5 Stars
    2. Teacher can collect tuition fee -withdrawFees() Done
    3. Teacher can withdraw bonus performance funds //if got time



    Name Registry Design pattern for Storing of Tuition

    Circuit breaker / Emergency Stop
    Class cancelled - > Teacher stops class, can refund for students

    Added some change here for test