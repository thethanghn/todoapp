import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';
import CreateCategoryForm from './CreateCategoryForm';
import Category from './Category';
import _ from 'lodash';

export default class Root extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired, // this is passed from the Rails view
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

  renderCategories() {
    return this.state.categories.map((cat) => {
      return (<Category category={cat} onDelete={this.handleDeleteCategory.bind(this)}/>);
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
