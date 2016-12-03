class AddCompletedToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :completed, :boolean, default: false
  end
end
