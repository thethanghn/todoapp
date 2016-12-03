import React, { PropTypes } from 'react';
import ItemRepository from '../api/Item';
import moment from 'moment';

export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onTaskCompleted: PropTypes.func,
    onTaskEditing: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  handleCompleteTask(item) {
    ItemRepository.completeTask(item.id).then((response) => {
      this.props.onTaskCompleted(response['data']);
    });
  }

  handleEditTask(item) {
    this.props.onTaskEditing(item);
  }

  renderText(text) {
    if (this.props.item.completed) {
      return <s>{text}</s>;
    }

    return <span>{text}</span>;
  }

  render() {
    let item = this.props.item;
    return (<div className="item">
      <h4 className="text-success">{this.renderText(item.name)}
        {(() => {
          if (!item.completed) {
            return (
              <div className="pull-right">
                <span className="glyphicon glyphicon-ok-circle" onClick={this.handleCompleteTask.bind(this, item)}></span>
                <span className="glyphicon glyphicon-pencil" onClick={this.handleEditTask.bind(this, item)}></span>
              </div>
            );
          }
          return null;
        })()}
      </h4>
      <div className="clearfix">
        <small className="text-info">
          {this.renderText(item.description)}
          <span className="pull-right">{moment(item.created_at).fromNow()}</span>
        </small>
      </div>
    </div>);
  }
};