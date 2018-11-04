
import React, { Component } from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {


  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ]

  render() {
    const { onFilterChange, filter } = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button type="button"
                className={`btn btn-info ${clazz}`}
                onClick={() => onFilterChange(name)}
                key={label}>{label}</button>
      )
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
  );
  }
};