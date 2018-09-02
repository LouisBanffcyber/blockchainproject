
# Project - ConsenSys 2018 Developer Program

## What does the project do?
This project will serve as a proof of concept and to fulfill the requirements of the final project grading rubic.


## How to set it up?

    Download From git - https://github.com/LouisBanffcyber/blockchainproject

    npm install

    Setup ganache - Follow the instructions at https://truffleframework.com/docs/ganache/quickstart
    (Configured truffle.js to port 8545)
    
    truffle compile

    truffle migrate

    truffle test

    npm run start




Description: Tuition Smart Contract to help teachers and students manage class registration, payments and also serves as a record of grades. So the idea here is to have an official record of the tuition class, students, teacher and grades on the blockchain and also transparency of the tuition fee, grades and teacher rating. Also to facilitate the management of funds from the student to the teacher.

## User Stories

The roles and use cases for the tuition contract

Contract Owner
The owner of the contract will serve as the administrator of the course. The contract owner will be the only one who has the permission to stop/resume the contract and will act as the official mediator if any dispute arises between student and teacher. After the contract is deployed, the owner will need to assign a teacher address to the contract.

Teacher
The person conducting the course is called the teacher. The teacher will be able to set the class name and tuition fee at the preparation stage. Uppn the completion of the course , the teacher will be able to grade the students registered to the course. The teacher is also responsible for triggering the movement of the contract stages. The teacher is able withdraw the tuition fee paid by the students at the end of the course.

Student
The student can register for courses by entering a name and paying the tuition fee to the contract. At the end of the course, students are able to rate the teacher's performance. Students are able to withdraw the tuition fee they paid when the contract is stopped. 



## Tuition Contract Stages


    Preparation
    1. Owner Assigns Teacher - SetTeacher()
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


## Notes

I hardcoded the max students per tuition contract to 2. After two students have registered at the registration stage , the contract stage will automatically be transited to started


## Testing

The test cases can be found in the test\testTuition.js

I have wrote the test to show how the tuition contract would work and to test out the various design patterns (Emergency stop, Access Restriction, State Machine, Withdrawls)

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


## Front End Web App

Running npm run start should open the browser to localhost:3000

The front end I came up with is super minimal and ugly (I'm not familiar with the react framework). Anyway do note that there is no error checking on the inputs. Do make sure you have metamask installed on your browser. You can use the test cases as a guide to try out the front end. 

The contract owner will always be the first account on ganache. Login as the first account in metamask and then try the assign teacher function. Put in the public address of account 2 on ganache and click submit. Confirm the transaction on metamask. After the transaction is mined, click refresh, you should see the Actions as Teacher for address: (You account 2 address)

After that, login to account 2 on metamask. Refresh the page, the current account should be updated to reflect the change. Try setting the class name and tuition fee.

Login as account 3 and try registering as a student. When successfull, you should see the collectedFee increase for each student u register as. I hard coded the max number of students to be 2 for this contract. 

You should get the idea, login with different accounts and try the various functions. Do take note of the contract stage. Refer to the Tuition Contract Stages mentioned above to see what functions are available at each stage.

*For the gradeStudent and giveTeacherRating functions are abit useless for now, I'm still figuring out how to display the studentInfo struct from the contract into react properly. But the test cases work! 

## For bonus points

I have deployed my contract at

https://rinkeby.etherscan.io/address/0x9eb75c08cb158fd291c422ff33fd43b28fd7a045

You can interact with it using remix, follow the instructions on how to load the contract with remix
https://medium.com/coinmonks/the-many-ways-to-deploy-your-smart-contract-to-rinkeby-network-38cadf7b20be

You cant do much except register for class. I am both the owner and teacher in this contract.
The tuition fee is 2eth and the class name is "solidity"
