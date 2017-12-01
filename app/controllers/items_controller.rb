class ItemsController < ApplicationController
  before_action :set_list, only: [:update, :create, :index, :show, :destroy]


  def index
    render json: @list
  end

  def show
    render json: @item
  end


  def update
    @item = @list.items.find(params[:id])

    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :upprocessable_entity
    end
  end

  def destroy
    Item.find(params[:id]).destroy
    render json: @item
  end

  private
  def set_list
    @list = @lsit.items.find(params[:list_id])
  end

  def item_params
    params.require(:item).permit(:description, :completed)
  end

end
