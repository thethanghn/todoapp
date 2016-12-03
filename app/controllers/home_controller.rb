class HomeController < ApplicationController
  def index
    @categories = Category.includes(:items).all.to_a
    @data = @categories.map { |x| { id: x.id, name: x.name, items: x.items.map {|y| {id: y.id, name: y.name }}}}
  end
end
