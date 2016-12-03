import React, { PropTypes } from 'react';

class ItemRepository {
  
  createTask(category_id, name, description) {
    return $.post('/api/v1/items', { item: { name: name, description: description, category_id: category_id } });
  }

  completeTask(id) {
    return $.get(`/api/v1/items/${id}/complete`);
  }

  updateTask(id, name, description) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/v1/items/${id}`,
        data: { item: { name: name, description: description }},
        type: 'PUT',
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

export default new ItemRepository()