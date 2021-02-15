class Api::V1::RolesController < ApplicationController
  def index
    render json: Role.all, status: 200
  end
end
