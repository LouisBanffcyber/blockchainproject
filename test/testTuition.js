// test/tuitionTest.js
const Tuition = artifacts.require("Tuition");

contract("Tuition", async(accounts) => {
  const ETHER = 10**18;
  const owner = accounts[0];
  const teacher = accounts[1];
  const student1 = accounts[2];
  const student2 = accounts[3];

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
 





});
