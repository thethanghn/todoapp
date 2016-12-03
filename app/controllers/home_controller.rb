class HomeController < ApplicationController
  def index
    @categories = Category.includes(:items).all.to_a
    @data = @categories.map &:to_hash
  end
end
