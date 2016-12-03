class Api::V1::CategoriesController < Api::V1::ApiController
  def index
    @categories = Category.all
    render json: @categories
  end

  def new
  end

  def create
    category = Category.new category_params
    if category.save
      render json: { status: true, data: category.to_hash }
    else
      render json: { status: false, errors: category.errors.full_messages }
    end
  end

  def edit
  end

  def update
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
