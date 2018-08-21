// test/tuitionTest.js
const Tuition = artifacts.require("Tuition");

contract("Tuition Contract", async(accounts) => {
  const ETHER = 10**18;
  const owner = accounts[0];
  const teacher = accounts[1];
  const student1 = accounts[2];
  const student2 = accounts[3];
  const student3 = accounts [4];

  it("Setup of tuition contract by owner", async () => {
    let tuitionInstance = await Tuition.deployed({from: owner});
    assert.equal(await tuitionInstance.owner.call(), owner,"Contract Owner" );

 
  });

  it("Set Teacher", async () => {
    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.setTeacher(teacher,{from: owner});
    assert.equal(await tuitionInstance.teacher.call(), teacher, "Teacher should be set");
  });


  it("Set Tuition Fee", async() => {

    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.setTuitionFee(2*ETHER , {from: teacher});
    assert.equal(await  tuitionInstance.tuitionFee.call(),2*ETHER, "Tuition Fee should be 2 Ether");

  });

  it("Set Class Name", async() => {

    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.setClassName("Solidity" , {from: teacher});
    assert.equal(await  tuitionInstance.className.call(),"Solidity", "Class Name should be Solidity");

  });

  it("Publish Class", async() => {

    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.publishClass({from: teacher});
    assert.equal(await tuitionInstance.stage.call(),1,"Stage should be at Registration")

  });
 
  it("Register Tuition for Student1", async() =>{
    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.registerTuition("StudentOne",{value: 2e+18 ,from: student1});
    assert.equal(await tuitionInstance.checkStudentExists(student1),true,"Student 1 should be registered");

  });

  it("Register Tuition for Student2", async() =>{
    let tuitionInstance = await Tuition.deployed();

    await tuitionInstance.registerTuition("StudentTwo",{value: 2e+18 ,from: student2});
    assert.equal(await tuitionInstance.checkStudentExists(student2),true,"Student 2 should be registered");

  });

  it("Register Tuition for Student3 but will fail to register", async() =>{
    let tuitionInstance = await Tuition.deployed();
    try{
      await tuitionInstance.registerTuition("StudentThree",{value: 2e+18 ,from: student3});
      assert.fail();
    }
    catch (err){
      assert.ok(/revert/.test(err.message));

    }

  });

  it("Check Stage = Started as max students = 2", async() =>{
    let tuitionInstance = await Tuition.deployed();
    assert.equal(await tuitionInstance.stage.call(),2,"Stage should be at Started");

  });

  it("Check FeeCollected = 4", async() => {
    let tuitionInstance = await Tuition.deployed();
    assert.equal(await tuitionInstance.feeCollected.call(),4e+18,"FeeCollected should be 4 Eth");
    assert.equal(await tuitionInstance.getBalance.call(),4e+18,"getBalance should be 4 Eth");      
  });

  it("Teacher sets stage to ended", async() => {
    let tuitionInstance = await Tuition.deployed();
    await tuitionInstance.endClass({from: teacher});
    assert.equal(await tuitionInstance.stage.call(),3,"Stage should be at Ended");

  });

  it("Teacher assigns grade to studentOne", async() => {
    let tuitionInstance = await Tuition.deployed();
    await tuitionInstance.recordGrade(student1,75,{from: teacher});
    let studentOneInfo = await tuitionInstance.studentInfo(student1);
    assert.equal(studentOneInfo[2],75,"Student1 grade should be 75");
  });


});
