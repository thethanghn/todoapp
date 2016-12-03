import React, { PropTypes } from 'react';

class ItemRepository {
  
  createTask(category_id, name, description) {
    return $.post('/api/v1/items', { item: { name: name, description: description, category_id: category_id } });
  }

  completeTask(id) {
    return $.get(`/api/v1/items/${id}/complete`);
  }
}

export default new ItemRepository()