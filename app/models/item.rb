# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  name        :string
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Item < ApplicationRecord
  belongs_to :category

  validates :name, presence: true, uniqueness: true

  def to_hash
    {id: id, name: name }
  end
end
