import React, { PropTypes } from 'react';

class CategoryRepository {
  getCategories() {
    return $.get('/api/v1/categories');
  }

  createCategory(name) {
    return $.post('/api/v1/categories', { category: { name: name } });
  }

  deleteCategory(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/v1/categories/${id}`,
        type: 'DELETE',
        success: (response) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        }  
      });
    });
  }
}

export default new CategoryRepository()