import React, { PropTypes } from 'react';

class CategoryRepository {
  getCategories() {
    return $.get('/api/v1/categories');
  }

  createCategory(name) {
    return $.post('/api/v1/categories', { category: { name: name } });
  }
}

export default new CategoryRepository()