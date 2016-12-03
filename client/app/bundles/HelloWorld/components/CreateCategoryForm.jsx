import React, { PropTypes } from 'react';
import CategoryRepository from '../api/Category';

export default class CreateCategoryForm extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  handleCreateCategory() {
    let value = this.categoryInput.value;
    if (value) {
      CategoryRepository.createCategory(value).then((response) => {
        this.props.onSuccess(response.data);
      }).catch(err => alert(err));
    }
  }

  render() {
    return <div className="input-group form-category">
      <input ref={(input) => {this.categoryInput = input;}} type="text" className="form-control" placeholder="Catgory Name"/>
      <span className="input-group-addon glyphicon glyphicon-pencil" onClick={this.handleCreateCategory.bind(this)}></span>
    </div>
  }
};