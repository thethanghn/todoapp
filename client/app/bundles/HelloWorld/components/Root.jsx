import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';
import CreateCategoryForm from './CreateCategoryForm';
import Category from './Category';
import _ from 'lodash';

export default class Root extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { categories: props.data, showCatgoryForm: false };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  showCreateCategoryForm() {
    this.setState({showCatgoryForm: true});
  }

  getCategories() {
    CategoryRepository.getCategories().then(data => {
      this.setState({categories: data});
    });
  }

  handleCreateCategory(newCategory) {
    let categories = this.state.categories;
    categories.push(newCategory);
    this.setState({categories: categories, showCatgoryForm: false});
  }

  handleDeleteCategory(deletedCategory) {
    let categories = this.state.categories;
    _.remove(categories, (c) => c.id == deletedCategory.id);
    this.setState({categories: categories}); 
  }

  handleTaskCreated(task) {
    let categories = this.state.categories;
    let cat = _.find(categories, (c) => c.id == task.category_id);
    cat.items.push(task);
    this.setState({categories: categories});
  }

  handleTaskCompleted(task) {
    let categories = this.state.categories;
    let cat = _.find(categories, (c) => c.id == task.category_id);
    _.remove(cat.items, (i) => i.id == task.id);
    cat.items.push(task);
    this.setState({categories: categories});
  }

  renderCategories() {
    return this.state.categories.map((cat, i) => {
      return (<Category key={i} category={cat} onDelete={this.handleDeleteCategory.bind(this)} onTaskCreated={this.handleTaskCreated.bind(this)} onTaskCompleted={this.handleTaskCompleted.bind(this)}/>);
    });
  }

  renderCategoryForm() {
    if (this.state.showCatgoryForm) {
      return (<CreateCategoryForm onSuccess={this.handleCreateCategory.bind(this)}/>);
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.renderCategories()}
        <a className="btn-block btn-link btn-create-category" onClick={this.showCreateCategoryForm.bind(this)}>Create category</a>
        {this.renderCategoryForm()}
      </div>
    );
  }
}
