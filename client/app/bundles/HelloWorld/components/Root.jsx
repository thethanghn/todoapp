import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';

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

  handleCreateCategory() {
    let value = this.categoryInput.value;
    if (value) {
      CategoryRepository.createCategory(value).then((response) => {
        console.log('resonse', response);
        let categories = this.state.categories;
        categories.push(response['data']);
        this.setState({categories: categories, showCatgoryForm: false});
      }).catch(err => alert(err));
    }
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
      return (<div className="input-group form-category">
          <input ref={(input) => {this.categoryInput = input;}} type="text" className="form-control" placeholder="Catgory Name"/>
          <span className="input-group-addon glyphicon glyphicon-pencil" onClick={this.handleCreateCategory.bind(this)}></span>
        </div>);
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
