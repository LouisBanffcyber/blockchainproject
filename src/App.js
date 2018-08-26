import React, { Component } from 'react'

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
      tuitionFee:null,
      className:null,
      feeCollected:null,
      text:"",
      
      
    }
    this.captureFile = this.captureFile.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.setTeacher = this.setTeacher.bind(this)
    this.updateTeacherAddr = this.updateTeacherAddr.bind(this)
    this.stopContract = this.stopContract.bind(this)
    this.resumeContract = this.resumeContract.bind(this)
    this.setClassName = this.setClassName.bind(this)
    this.updateClassName = this.updateClassName.bind(this)
    this.setTuitionFee = this.setTuitionFee.bind(this)
    this.updateTuitionFee = this.updateTuitionFee.bind(this)
    this.publishClass = this.publishClass.bind(this)
    this.endClass = this.endClass.bind(this)
    this.reviewClass = this.reviewClass.bind(this)
    this.registerTuition = this.registerTuition.bind(this)
    this.updateStudentName = this.updateStudentName.bind(this)
    this.giveTeacherRating = this.giveTeacherRating.bind(this)
    this.updateTeacherRating = this.updateTeacherRating.bind(this)
    this.withdrawFees = this.withdrawFees.bind(this)
    this.emergencyWithdraw = this.emergencyWithdraw.bind(this)
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
       
      return this.setState({teacherAddr:result})
    })

      //Get contractstopped
      tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.isStopped.call()
      }).then((result) => {
        // Update state with the result
         
        return this.setState({contractStopped:String(result)})
      })
      
       //Get class name
       tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.className.call()
      }).then((result) => {
        // Update state with the result
        
      
        return this.setState({className:String(result)})
      })

       //Get tuition fee
       tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.tuitionFee.call()
      }).then((result) => {
        // Update state with the result
       
        return this.setState({tuitionFee:result.toNumber()})
      })

       //Get fee collected
       tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.feeCollected.call()
      }).then((result) => {
        // Update state with the result
         
      
        return this.setState({feeCollected:result.toNumber()})
      })

         //Get student Info
         tuition.deployed().then((instance) => {
          this.tuitionInstance = instance
          // Get the value from the contract to prove it worked.
          return this.tuitionInstance.studentInfo(this.state.web3.eth.accounts[0])
        }).then((result) => {
          // Update state with the result
          console.log('getting student info')
           console.log(result)
        
          return this.setState({studentInfo:result.toNumber()})
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
   
    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.setTeacher(this.state.text, {from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
}

setClassName(event){
  //Get Teacher
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
   
    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.setClassName(this.state.text, {from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
}

setTuitionFee(event){
  //Get Teacher
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
   
    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.setTuitionFee(this.state.text, {from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
}

registerTuition(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
   
    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.registerTuition(this.state.text,{value: this.state.tuitionFee,from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
}

giveTeacherRating(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
    
    // Get the value from the contract to prove it worked
    console.log(this.state.text)
    return this.tuitionInstance.giveTeacherRating(this.state.text,{from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    console.log(result)
    window.location.reload();
    
  })
}


recordGrade(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance
    
    // Get the value from the contract to prove it worked
    console.log(this.state.text)
    return this.tuitionInstance.recordGrade(this.state.text,{from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    console.log(result)
    window.location.reload();
    
  })
}







updateTeacherAddr(event){
  event.preventDefault()
  this.setState({text : event.target.value})
  }

updateClassName(event){
    event.preventDefault()
    this.setState({text : event.target.value})
}

updateTuitionFee(event){
    event.preventDefault()
    this.setState({text : event.target.value*1e+18})
      
}
updateStudentName(event){
    event.preventDefault()
    this.setState({text : event.target.value})
        
}    
updateTeacherRating(event){
  event.preventDefault()
  this.setState({text : event.target.value})
      
}  


updateStudentGrade(event){
  event.preventDefault()
  this.setState({text : event.target.value})
      
}  

stopContract(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.stopContract({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}

resumeContract(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.resumeContract({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}

publishClass(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.publishClass({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}
endClass(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.endClass({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}

reviewClass(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.reviewClass({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}

withdrawFees(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.withdrawFees({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
}

emergencyWithdraw(event){
  event.preventDefault()
  const contract = require('truffle-contract')
  const tuition = contract(TuitionContract)
  tuition.setProvider(this.state.web3.currentProvider)
  
  tuition.deployed().then((instance) => {
    this.tuitionInstance = instance

    // Get the value from the contract to prove it worked.
    return this.tuitionInstance.emergencyWithdraw({from: this.state.web3.eth.accounts[0]})
  }).then((err,result) => {
    // Update state with the result.
    window.location.reload();
    
  })
  
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

              <h1>Current Account:{this.state.curAccount} </h1>
            
              <h1>Tuition Contract State Variables</h1>
              
              <h2>Contract Stage: {this.state.contractStage}</h2>
              <p>Contract Stage Value corresponds to (0:Preparation, 1:Registration, 2:Started, 3:Ended, 4:Review)</p>
              <h2>Contract Stopped: {this.state.contractStopped} </h2>
              <h2>Class Name: {this.state.className}</h2>
              <h2>Tuition Fee: {this.state.tuitionFee/1e+18} eth</h2>
              <h2> Collected Fee: {this.state.feeCollected/1e+18}</h2>
              



              <h2>Actions as contract owner:{this.state.ownerAddr}</h2>
               <p>Assign Teacher</p>
               <form onSubmit={this.setTeacher} >
              <input type="text" placeholder="Enter Teacher Address" onChange={this.updateTeacherAddr}/>
              <input type="submit" value="Submit" />
              </form>
               

               <p>Emergency Contract Stop</p>
               <form onSubmit={this.stopContract} >
              
              <input type="submit" value="Stop Contract" />
              </form>
               <p>Resume Contract</p>
               <form onSubmit={this.resumeContract} >
              <input type="submit" value="Resume Contract" />
              </form>

              <h2>Actions as Teacher for address: {this.state.teacherAddr}</h2>
              <p>Set Class Name</p>
              <form onSubmit={this.setClassName} >
              <input type="text" placeholder="Name of class" onChange={this.updateClassName}/>
              <input type="submit" value="Submit" />
              </form>
               

              <p>Set Tuition Fee in eth</p>

              <form onSubmit={this.setTuitionFee} >
              <input type="text" placeholder="Enter Tuition Fee > 0 eth" onChange={this.updateTuitionFee}/>
              <input type="submit" value="Submit" />
              </form>

              <p>Publish Class</p>
              <form onSubmit={this.publishClass} >
              <input type="submit" value="Publish Class" />
              </form>


               <p>End Class</p>
               <form onSubmit={this.endClass} >
              <input type="submit" value="End Class" />
              </form>

               <p>Grade student</p>
             
               <form onSubmit={this.recordGrade} >
              <input type="text" placeholder="student address,grade" onChange={this.updateStudentGrade}/>
              <input type="submit" value="Record Grade" />
              </form>

           


               <p>Review Class</p>
               <form onSubmit={this.reviewClass} >
              <input type="submit" value="Review Class" />
              </form>

               <p>Withdraw Fee</p>
               <form onSubmit={this.withdrawFees} >
              <input type="submit" value="Withdraw fees" />
              </form>

               <h2>Actions as student</h2>
               <p>Register for Class</p>
               
              <form onSubmit={this.registerTuition} >
              <input type="text" placeholder="Name of student" onChange={this.updateStudentName}/>
              <input type="submit" value="Register" />
              </form>
               
               <p>Emergency Withdraw Fee</p>
               <form onSubmit={this.emergencyWithdraw} >
              <input type="submit" value="Emergency Withdraw" />
              </form>
               

               <p>Give Teacher Rating</p>
               <form onSubmit={this.giveTeacherRating} >
              <input type="text" placeholder="Give teacher rating" onChange={this.updateTeacherRating}/>
              <input type="submit" value="Rate teacher" />
              </form>

           
       
             
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
