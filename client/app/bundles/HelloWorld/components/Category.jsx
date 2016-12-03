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

    this.state = { showTaskForm: false, editingItem: null };
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

  handleTaskCompleted(task) {
    this.props.onTaskCompleted(task);
  }

  handleItemEditing(task) {
    this.setState({showTaskForm: true, editingItem: task});
  }

  renderItems(cat) {
    return (<ul className="task-list">
        {cat.items.map((item) => {
          return <li><Item item={item} onTaskCompleted={this.handleTaskCompleted.bind(this)} onTaskEditing={this.handleItemEditing.bind(this)}/></li>;
        })}
      </ul>)
  }

  renderTaskForm(cat, item) {
    if (this.state.showTaskForm) {
      return <CreateTaskForm category={cat} onSuccess={this.handleTaskCreated.bind(this)} item={this.state.editingItem}/>
    }

    return null;
  }

  render() {
    let cat = this.props.category;
    return (<div className="category">
        <h3 className="text-primary title">{cat.name}
          <span className="pull-right glyphicon glyphicon-minus" onClick={this.handleDeleteCategory.bind(this, cat)}></span>
        </h3>
        <div className="content">
          {this.renderItems(cat)}
          <a className="btn-block btn-link btn-create-task" onClick={this.showCreateTaskForm.bind(this)}>Add task...</a>
          {this.renderTaskForm(cat)}
        </div>
      </div>);
  }
};