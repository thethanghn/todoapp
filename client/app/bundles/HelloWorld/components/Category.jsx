import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';

export default class Category extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    category: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  handleDeleteCategory(cat) {
    CategoryRepository.deleteCategory(cat.id).then((response) => {
      this.props.onDelete(cat);
    }).catch(err => alert(err));
  }

  renderItems(cat) {
    return (<ul>
        {cat.items.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>)
  }

  render() {
    let cat = this.props.category;
    return (<div>
        <h3 className="text-primary">{cat.name}
          <span className="pull-right glyphicon glyphicon-remove-circle" onClick={this.handleDeleteCategory.bind(this, cat)}></span>
        </h3>
        {this.renderItems(cat)}
      </div>);
  }
};