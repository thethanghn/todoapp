# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  name        :string
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#  completed   :boolean          default(FALSE)
#

class Item < ApplicationRecord
  belongs_to :category

  validates :name, presence: true, uniqueness: true

  def to_hash
    {id: id, name: name, description: description, created_at: created_at, category_id: category_id, completed: completed }
  end
end
