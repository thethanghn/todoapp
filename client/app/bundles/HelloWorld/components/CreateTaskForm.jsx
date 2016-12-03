import React, { PropTypes } from 'react';
import TaskRepository from '../api/Item';

export default class CreateItemForm extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func, // this is passed from the Rails view
    category: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  handleSaveTask() {
    let name = this.taskInput.value;
    let description = this.taskDescription.value;
    if (name && description) {
      if (this.props.item) {
        TaskRepository.updateTask(this.props.item.id, name, description).then((response) => {
          this.props.onSuccess(response.data);  
        });
      } else {
        TaskRepository.createTask(this.props.category.id, name, description).then((response) => {
          this.props.onSuccess(response.data);
        }).catch(err => alert(err));
      }
    }
  }

  render() {
    let name = this.props.item ? this.props.item.name : '';
    let desc = this.props.item ? this.props.item.description : '';
    return <div className="form-task">
      <input ref={(input) => {this.taskInput = input;}} type="text" className="form-control" placeholder="Task Name" required="true" defaultValue={name}/>
      <textarea ref={(input) => this.taskDescription = input } rows="5" className="form-control" placeholder="Task Description" required="true" defaultValue={desc}></textarea>
      <button type="button" className="btn btn-block btn-primary" onClick={this.handleSaveTask.bind(this)}>Save</button>
    </div>
  }
};