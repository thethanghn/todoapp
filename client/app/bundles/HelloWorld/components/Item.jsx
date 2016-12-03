import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';
import moment from 'moment';

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
      <h4 className="text-success">{item.name}</h4>
      <small className="text-info">
        {item.description}
        <span className="pull-right">{moment(item.created_at).fromNow()}</span>
      </small>
    </div>);
  }
};