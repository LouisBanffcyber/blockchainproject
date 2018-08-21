// test/tuitionTest.js
const Tuition = artifacts.require("Tuition");

contract("Tuition", accounts => {
  const [firstAccount,teacherAccount] = accounts;

  it("sets an owner", async () => {
    const tuition = await Tuition.new();
    assert.equal(await tuition.owner.call(), firstAccount);
  });

 





});
