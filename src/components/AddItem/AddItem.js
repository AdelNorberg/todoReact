import React, {Component} from 'react';

import './AddItem.css';

export default class AddItem extends Component {
  
  state = {
    label: ''
  };

  render(){
    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
        <input type="text" 
                className="form-control"
                placeholder="What needs to be done"
                onChange={this.onLabelChange}
                value={this.state.label} />
        <button className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    })
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };
};
