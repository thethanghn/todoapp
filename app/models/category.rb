# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ApplicationRecord
  has_many :items, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  def to_hash
    { id: id, name: name, items: items.map(&:to_hash) }
  end
end
