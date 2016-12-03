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

  handleCompleteTask(item) {

  }

  render() {
    let item = this.props.item;
    return (<div className="item">
      <h4 className="text-success">{item.name}
        <span className="pull-right glyphicon glyphicon-ok-circle" onClick={this.handleCompleteTask.bind(this, item)}></span>
      </h4>
      <div className="clearfix">
        <small className="text-info">
          {item.description}
          <span className="pull-right">{moment(item.created_at).fromNow()}</span>
        </small>
      </div>
    </div>);
  }
};