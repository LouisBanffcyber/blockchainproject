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
      account: null,
      ownerAddr:null,
      contractStage:null,
      blockNumber: web3.eth.blockNumber
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
      tuition.deployed().then((instance) => {
        this.tuitionInstance = instance
        // Get the value from the contract to prove it worked.
        return this.tuitionInstance.owner.call()
      }).then((result) => {
        // Update state with the result.
        console.log(result)
        return this.setState({ownerAddr:result})
      })
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
              <h1>Tuition Contract</h1>
              <p>The owner of this contract is:{this.state.ownerAddr}</p>
            
              <h2>Contract Stage</h2>
              <p>The stage of this contract is:{this.state.contractStage}</p>
            


              <form onSubmit={this.onSubmit} >

                <input type='file' onChange={this.captureFile}/>
                <input type='submit' /> 

              </form>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
