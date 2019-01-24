import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customerList: []
    };
  }

  componentDidMount(){
    axios.get('/api/customers').then((response) => {
        this.setState({
          customerList: response.data
        });
    });
  };

  deleteCustomer(id){
    axios.delete(`/api/customer/${id}`).then((response) => {
        this.setState({
          customerList: response.data
        })
    });
  }

  render() {
    const { customerList } = this.state;
    const mappedCustomerList = customerList.map(customer => {
      return (
        <div key={customer.id} className="customer-card">
          <span>{`${customer.id} - ${customer.name}`}</span>
          <button onClick={() => this.deleteCustomer(customer.id)}>Delete</button>
        </div>
      );
    });


    return <div className="App">
      <header>
        <div>
          <h1>Customer Page</h1>

          <nav>
            <a href="#">Home</a>
            <a href="#">Account</a>
            <a href="#">Support</a>
            <a href="#">Contact</a>
          </nav>


        </div>
      </header>

      <section>
        <div>

            <h1>current customers</h1>
            <div className="customer-card-container">
            {mappedCustomerList}
            </div>

        </div>
      </section>
    </div>;
  }
}

export default App;
