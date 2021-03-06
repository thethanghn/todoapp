class Api::V1::ItemsController < Api::V1::ApiController

  def index
    @items = Item.all
    render json: @items
  end

  def new
  end

  def create
    item = Item.new item_params
    if item.save
      render json: { status: true, data: item.to_hash }
    else
      render json: { status: false, errors: item.errors.full_messages }
    end
  end

  def edit
  end

  def update
    item = Item.find params[:id]
    item.attributes = item_params
    if item.save
      render json: { status: true, data: item.to_hash }
    else
      render json: { status: false, errors: item.errors.full_messages }
    end
  end

  def complete
    item = Item.find params[:id]
    item.update completed: true
    render json: { status: true, data: item.to_hash }
  end

  private

  def item_params
    params.require(:item).permit(:name, :category_id, :description)
  end
end
