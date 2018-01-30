import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, InputGroup, InputGroupAddon, Jumbotron } from 'reactstrap';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hashrate: 100,
      nethashrate: 1,
      power: 200,
      cost: 0.12,
      pool: 1,
      price: 2,
      coinblock: 50
    }

    this.hashrateChange = this.hashrateChange.bind(this);
    this.powerChange = this.powerChange.bind(this);
    this.costChange = this.costChange.bind(this);
    this.poolChange = this.poolChange.bind(this);
    this.nethashrateChange = this.nethashrateChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.coinblockChange = this.coinblockChange.bind(this);

    this.coinChance = this.coinChance.bind(this);
    this.percentNetwork = this.percentNetwork.bind(this);
  }

  componentWillMount() {
    const self = this;

    axios.get('https://garli.co.in/api/getnetworkhashps')
    .then(function (response) {
      self.setState({
        nethashrate: (response.data / (1000 * 1000 * 1000)).toFixed(4)
      });
    })
    .catch(function (error) {
      console.log("Error, cannot fetch API");
    });  

    axios.get('https://api.coinmarketcap.com/v1/ticker/garlicoin/')
    .then(function (response) {
      self.setState({
        price: response.data[0].price_usd
      });
    })
    .catch(function (error) {
      console.log("Error, cannot fetch API");
    });  
  }

  coinChance() {
    return this.state.nethashrate*1000*1000/this.state.hashrate;
  }

  percentNetwork() {
    return 100/((this.state.nethashrate*1000*1000)/this.state.hashrate);
  }

  hashrateChange(event) {
    this.setState({hashrate: event.target.value});
  }

  powerChange(event) {
    this.setState({power: event.target.value});
  }

  costChange(event) {
    this.setState({cost: event.target.value});
  }

  poolChange(event) {
    this.setState({pool: event.target.value});
  }

  nethashrateChange(event) {
    this.setState({nethashrate: event.target.value});
  }

  priceChange(event) {
    this.setState({price: event.target.value});
  }

  coinblockChange(event) {
    this.setState({coinblock: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <Jumbotron style={{padding: '2rem'}}>
          <h2>Your information</h2>
          <Form style={{paddingTop: '1rem'}}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="hashrate">Your hashrate</Label>
                  <InputGroup>
                    <Input name="hashrate" id="hashrate" value={this.state.hashrate} onChange={this.hashrateChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>kH/s</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="power">Power consumption</Label>
                  <InputGroup>
                    <Input name="power" id="power" value={this.state.power} onChange={this.powerChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>W</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="cost">Cost per KWh</Label>
                  <InputGroup>
                    <Input name="cost" id="cost" value={this.state.cost} onChange={this.costChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>$</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="pool">Pool fee</Label>
                  <InputGroup>
                    <Input name="pool" id="pool" value={this.state.pool} onChange={this.poolChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>%</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Jumbotron>

        <Jumbotron style={{padding: '2rem'}}>
          <h2>GRLC information</h2>
          <Form style={{paddingTop: '1rem'}}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="nethashrate">Network hashrate</Label>
                  <InputGroup>
                    <Input name="nethashrate" id="nethashrate" value={this.state.nethashrate} onChange={this.nethashrateChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>GH/s</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="cost">GRLC price</Label>
                  <InputGroup>
                    <Input name="cost" id="cost" value={this.state.price} onChange={this.priceChange} />
                    <InputGroupAddon className='input-group-append'>
                      <span className='input-group-text'>$</span>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
              </Col>
              <Col>

              </Col>
            </Row>
          </Form>
        </Jumbotron>

        <h3>Solo mining</h3>
        <div style={{margin: '2rem 0'}}>
          Probability to find a block: <b>{Math.trunc((this.state.nethashrate * 1000 * 1000 / this.state.hashrate)/2160)}</b> days and <b>{Math.trunc(24* (((this.state.nethashrate * 1000 * 1000 / this.state.hashrate)/2160) - (Math.trunc((this.state.nethashrate * 1000 * 1000 / this.state.hashrate)/2160))))}</b> hours (every <b>{Math.round(this.state.nethashrate * 1000 * 1000 / this.state.hashrate)}</b> blocks)
        </div>
        <div>
        <h3>Pool mining</h3><br />
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Per minute</th>
                <th scope="col">Per hour</th>
                <th scope="col">Per day</th>
                <th scope="col">Per month</th>
                <th scope="col">Per year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Mined coins</th>
                <td><b>{(75*(this.percentNetwork()/100)).toFixed(6)}</b></td>
                <td><b>{(60*75*(this.percentNetwork()/100)).toFixed(6)}</b></td>
                <td><b>{(24*60*75*(this.percentNetwork()/100)).toFixed(6)}</b></td>
                <td><b>{(30*24*60*75*(this.percentNetwork()/100)).toFixed(6)}</b></td>
                <td><b>{(365*24*60*75*(this.percentNetwork()/100)).toFixed(6)}</b></td>
              </tr>
              <tr>
                <th scope="row">USD</th>
                <td>${(this.state.price*75*(this.percentNetwork()/100)).toFixed(6)}</td>
                <td>${(this.state.price*60*75*(this.percentNetwork()/100)).toFixed(6)}</td>
                <td>${(this.state.price*24*60*75*(this.percentNetwork()/100)).toFixed(6)}</td>
                <td>${(this.state.price*30*24*60*75*(this.percentNetwork()/100)).toFixed(6)}</td>
                <td>${(this.state.price*365*24*60*75*(this.percentNetwork()/100)).toFixed(6)}</td>
              </tr>
              <tr>
                <th scope="row">Power cost</th>
                <td>${(this.state.power == 0 || this.state.cost == 0) ? ' -' : (this.state.cost*(this.state.power*0.017/1000)).toFixed(6)}</td>
                <td>${(this.state.power == 0 || this.state.cost == 0) ? ' -' : (this.state.cost*(this.state.power*1/1000)).toFixed(6)}</td>
                <td>${(this.state.power == 0 || this.state.cost == 0) ? ' -' : (this.state.cost*(this.state.power*24/1000)).toFixed(6)}</td>
                <td>${(this.state.power == 0 || this.state.cost == 0) ? ' -' : (this.state.cost*(this.state.power*24*30/1000)).toFixed(6)}</td>
                <td>${(this.state.power == 0 || this.state.cost == 0) ? ' -' : (this.state.cost*(this.state.power*24*365/1000)).toFixed(6)}</td>
              </tr>
              <tr>
                <th scope="row">Pool fee</th>
                <td>${this.state.pool == 0 ? ' -' : (this.state.price*75*(this.percentNetwork()/100)*(this.state.pool/100)).toFixed(6)}</td>
                <td>${this.state.pool == 0 ? ' -' : (this.state.price*60*75*(this.percentNetwork()/100)*(this.state.pool/100)).toFixed(6)}</td>
                <td>${this.state.pool == 0 ? ' -' : (this.state.price*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100)).toFixed(6)}</td>
                <td>${this.state.pool == 0 ? ' -' : (this.state.price*30*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100)).toFixed(6)}</td>
                <td>${this.state.pool == 0 ? ' -' : (this.state.price*365*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100)).toFixed(6)}</td>
              </tr>
              <tr>
                <th scope="row">Profit</th>
                <td><b>${((this.state.price*75*(this.percentNetwork()/100)) - (this.state.cost*(this.state.power*0.017/1000)) - (this.state.pool == 0 ? 0 : this.state.price*75*(this.percentNetwork()/100)*(this.state.pool/100))).toFixed(6)}</b></td>
                <td><b>${((this.state.price*60*75*(this.percentNetwork()/100)) - (this.state.cost*(this.state.power*1/1000)) - (this.state.pool == 0 ? 0 : this.state.price*60*75*(this.percentNetwork()/100)*(this.state.pool/100))).toFixed(6)}</b></td>
                <td><b>${((this.state.price*24*60*75*(this.percentNetwork()/100)) - (this.state.cost*(this.state.power*24/1000)) - (this.state.pool == 0 ? 0 : this.state.price*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100))).toFixed(6)}</b></td>
                <td><b>${((this.state.price*30*24*60*75*(this.percentNetwork()/100)) - (this.state.cost*(this.state.power*24*30/1000)) - (this.state.pool == 0 ? 0 : this.state.price*30*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100))).toFixed(6)}</b></td>
                <td><b>${((this.state.price*365*24*60*75*(this.percentNetwork()/100)) - (this.state.cost*(this.state.power*24*365/1000)) - (this.state.pool == 0 ? 0 : this.state.price*365*24*60*75*(this.percentNetwork()/100)*(this.state.pool/100))).toFixed(6)}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
