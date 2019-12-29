class ServicesController < ApplicationController
  def index
    render json: Service.all.group_by(&:category)
  end
end
