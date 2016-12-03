import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';
import Item from './Item';
import CreateTaskForm from './CreateTaskForm';

export default class Category extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    onTaskCreated: PropTypes.func,
    category: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.state = { showTaskForm: false };
  }

  showCreateTaskForm() {
    this.setState({showTaskForm: true});
  }

  handleDeleteCategory(cat) {
    CategoryRepository.deleteCategory(cat.id).then((response) => {
      this.props.onDelete(cat);
    }).catch(err => alert(err));
  }

  handleTaskCreated(task) {
    this.setState({showTaskForm: false}, () => {
      this.props.onTaskCreated(task);
    });
  }

  renderItems(cat) {
    return (<ul className="task-list">
        {cat.items.map((item) => {
          return <li><Item item={item}/></li>;
        })}
      </ul>)
  }

  renderTaskForm(cat) {
    if (this.state.showTaskForm) {
      return <CreateTaskForm category={cat} onSuccess={this.handleTaskCreated.bind(this)}/>
    }

    return null;
  }

  render() {
    let cat = this.props.category;
    return (<div className="category">
        <h3 className="text-primary">{cat.name}
          <span className="pull-right glyphicon glyphicon-remove-circle" onClick={this.handleDeleteCategory.bind(this, cat)}></span>
        </h3>
        <div className="content">
          {this.renderItems(cat)}
          <a className="btn-block btn-link btn-create-task" onClick={this.showCreateTaskForm.bind(this)}>Add task...</a>
          {this.renderTaskForm(cat)}
        </div>
      </div>);
  }
};