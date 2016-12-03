import React, { PropTypes } from 'react';

class CategoryRepository {
  getCategories() {
    return $.get('/api/v1/categories');
  }
}

export default new CategoryRepository()