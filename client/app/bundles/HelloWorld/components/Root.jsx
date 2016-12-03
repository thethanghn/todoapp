import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';

export default class Root extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { name: this.props.name, categories: [] };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  getCategories() {
    CategoryRepository.getCategories().then(data => {
      this.setState({categories: data});
    });
  }

  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
        <button onClick={(e) => this.getCategories()}>Click me</button>
        <ul>
          {(() => {
            return this.state.categories.map(cat => {
              return <li>{cat.name}</li>;
            });
          })()}
        </ul>
      </div>
    );
  }
}
