const Adoption = artifacts.require("Adoption")

contract('Adoption', function(accounts) {
  describe('first group of tests', () => {
    let instance;

    before(async()=>{
      instance = await Adoption.deployed();
    });

    it('should adopt a pet', async() => {
      await instance.adopt.sendTransaction(8, {from: accounts[0]});
      let adopter = await instance.adopters.call(8);
      assert.equal(adopter,accounts[0],"Incorrect owner");
    });

    it('returns adopters from getAdopters function', async()=>{
      await instance.adopt.sendTransaction(0, {from: accounts[0]});
      await instance.adopt.sendTransaction(1, {from: accounts[1]});
      await instance.adopt.sendTransaction(2, {from: accounts[2]});

      let adopters = await instance.getAdopters.call();
      assert.equal(adopters[0],accounts[0]);
      assert.equal(adopters[1],accounts[1]);
      assert.equal(adopters[2],accounts[2]);

      assert.equal(adopters[8],accounts[0],"Ownwer of pet id 9 should be recorded in the array");
    })

    it('checks for error outside array boundries', async() => {
      try{
        await instance.adopt.sendTransaction(8, {from: accounts[0]});
        assert.fail(true,false,"this function did not run");
      }catch(err){
        assert(err);
      }
    });

  });
});
