import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';
import CreateCategoryForm from './CreateCategoryForm';

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

  renderItems(cat) {
    return (<ul>
        {cat.items.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>)
  }

  renderCategories() {
    return this.state.categories.map((cat) => {
      return (<div>
        <h3 className="text-primary">{cat.name}</h3>
        {this.renderItems(cat)}
      </div>);
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
