
●  	A project README.md that explains your project
○  	What does your project do?
○  	How to set it up
■  	Run a local development server
 
●  	Your project should be a truffle project
○  	All of your contracts should be in a contracts directory
■  	Truffle compile should successfully compile contracts
○  	Migration contract and migration scripts should work
■  	Truffle migrate should successfully migrate contracts to a locally running ganache-cli test blockchain on port 8545
○  	All tests should be in a tests directory
■  	Running truffle test should migrate contracts and run your tests
Smart Contract code should be commented according to the specs in the documentation
 
●  	Create at least 5 tests for each smart contract
○  	Write a sentence or two explaining what the tests are covering, and explain why you wrote those tests
 
●  	A development server to serve the front end interface of the application
○  	It can be something as simple as the lite-server used in the truffle pet shop tutorial
 
●  	A document called design_pattern_desicions.md that explains why you chose to use the design patterns that you did.
●  	A document called avoiding_common_attacks.md that explains what measures you took to ensure that your contracts are not susceptible to common attacks. (Module 9 Lesson 3)
 
●  	Implement a library or an EthPM package in your project
○  	If your project does not require a library or an EthPM package, demonstrate how you would do that in a contract called LibraryDemo.sol
Requirements
●  	User Interface Requirements:
○  	Run the app on a dev server locally for testing/grading
○  	You should be able to visit a URL and interact with the application
■  	App recognizes current account
■  	Sign transactions using MetaMask / uPort
■  	Contract state is updated
■  	Update reflected in UI
 
●  	Test Requirements:
○  	Write 5 tests for each contract you wrote
■  	Solidity or JavaScript
○  	Explain why you wrote those tests
○  	Tests run with truffle test
 
●  	Design Pattern Requirements:
○  	Implement emergency stop
○  	What other design patterns have you used / not used?
■  	Why did you choose the patterns that you did?
■  	Why not others?
 
●  	Security Tools / Common Attacks:
○  	Explain what measures you’ve taken to ensure that your contracts are not susceptible to common attacks
 
●  	Use a library
○  	Via EthPM or write your own

  
●  	Stretch requirements (for bonus points, not required):
○  	Deploy your application onto the Rinkeby test network. Include a document called deployed_addresses.txt that describes where your contracts live on the test net.
○  	Integrate with an additional service, maybe even one we did not cover in this class

For example:
■      IPFS
■      uPort
■      Ethereum Name Service
■      Oracle


 Proof of Existence dApp
Description: This application allows users to prove existence of some information by showing a time stamped picture/video.
 
Data could be stored in a database, but to make it truly decentralized consider storing pictures using something like IPFS. The hash of the data and any additional information is stored in a smart contract that can be referenced at a later date to verify the authenticity.
 
User Stories:
A user logs into the web app. The user can upload some data (pictures/video) to the app, as well as add a list of tags indicating the contents of the data.
 
The app reads the user’s address and shows all of the data that they have previously uploaded.
 
Users can retrieve necessary reference data about their uploaded items to allow other people to verify the data authenticity.
 
Here are some suggestions for additional components that your project could include:
●  	Make your app mobile friendly, so that people can interact with it using a web3 enabled mobile browser such as Toshi or Cipher.
○  	Allow people to take photos with their mobile device and upload them from there
●  	Deploy your dApp to a testnet
○  	Include the deployed contract address so people can interact with it
○  	Serve the UI from IPFS or a traditional web server



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
    2. Teacher can collect tuition fee -withdrawFees() Done

    Review
    1. Students vote on teacher performance upon 5 Stars
    2. Teacher can withdraw bonus performance funds //if got time



    Name Registry Design pattern for Storing of Tuition

    Circuit breaker / Emergency Stop
    Class cancelled - > Teacher stops class, can refund for students