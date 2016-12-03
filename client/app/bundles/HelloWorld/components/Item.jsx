import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';

export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    let item = this.props.item;
    return (<div>
      <h5>{item.name}</h5>
      <small>{item.description}</small>
    </div>);
  }
};