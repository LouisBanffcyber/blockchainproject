import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import TuitionContract from '../build/contracts/Tuition.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash : "",
      web3: null,
      buffer:null,
      curAccount: null,
      ownerAddr:null,
      contractStage:null,
      teacherAddr:null,
      studentInfo:null,
      contractStopped:false,
      feeCollected:null,
      tuitionFee:null,
      text:"",
      
      
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.setTeacher = this.setTeacher.bind(this);
    this.updateTeacherAddr = this.updateTeacherAddr.bind(this);

  }


 

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require('truffle-contract')
    const tuition = contract(TuitionContract)
    tuition.setProvider(this.state.web3.currentProvider)
    

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      // console.log(accounts)
      return this.setState({curAccount:accounts})
    })

    //get contract owner
    tuition.deployed().then((instance) => {
      this.tuitionInstance = instance
      // Get the value from the contract to prove it worked.
      return this.tuitionInstance.owner.call()
    }).then((result) => {
      // Update state with the result.
      // console.log(result)
      return this.setState({ownerAddr:result})
    })

    //Get contract stage
      tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.stage.call()
      }).then((result) => {
        // Update state with the result.
        // console.log(result.toNumber())
        return this.setState({contractStage:result.toNumber()})
      })

     //Get Teacher
     tuition.deployed().then((instance) => {
      this.tuitionInstance = instance
      // Get the value from the contract to prove it worked.
      return this.tuitionInstance.teacher.call()
    }).then((result) => {
      // Update state with the result.
       console.log(result)
      return this.setState({teacherAddr:result})
    })
    
    


  }

 

setTeacher(event){
  //Get Teacher
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
    console.log("setting teacher")
  
    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.setTeacher(this.state.text, {from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  

}

updateTeacherAddr(event){
  event.preventDefault()
  this.setState({text : event.target.value})
  
  }





captureFile(event){
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) })
    console.log('buffer', this.state.buffer)
  }

}

onSubmit(event) {
  event.preventDefault()
  ipfs.files.add(this.state.buffer, (error, result) => {
    if(error) {
      console.error(error)
      return
    }
    this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
      console.log('ifpsHash', this.state.ipfsHash)
      return this.setState({ ipfsHash: result[0].hash })
     
    })
  })
}



  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Blockchain Project DAPP</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">

              <h1>Current account</h1>
              <p>The current account is:{this.state.curAccount}</p>

              <h1>Tuition Contract</h1>
              <p>The owner of this contract is:{this.state.ownerAddr}</p>
            
              <h2>Contract Stage</h2>
              <p>The stage of this contract is:{this.state.contractStage}</p>

               <h2>Actions as contract owner</h2>
               <p>Assign Teacher</p>

               <form onSubmit={this.setTeacher} >
              
              <input type="text" placeholder="Enter Teacher Address" onChange={this.updateTeacherAddr} />
            
              <input type="submit" value="Submit" />
              </form>
               

               <p>Emergency Contract Stop</p>
               <p>Resume Contract</p>

               <h2>Actions as Teacher for address: {this.state.teacherAddr}</h2>
               <p>Set Class Name</p>
               <p>Set Tuition Fee</p>
               <p>Resume Contract</p>
               <p>Publish Class</p>
               <p>End Class</p>
               <p>Grade student</p>
               <p>Review Class</p>
               <p>Withdraw Fee</p>

               <h2>Actions as student</h2>
               <p>Register Class</p>
               <p>Emergency Withdraw Fee</p>
               <p>Give Teacher Rating</p>

           
           


              <form onSubmit={this.onSubmit} >

                <input type='file' onChange={this.captureFile}/>
                <input type='submit' /> 

              </form>
             
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
