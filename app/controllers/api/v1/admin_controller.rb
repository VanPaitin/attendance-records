module Api
  module V1
    class AdminController < ApplicationController
      before_action :ensure_admin

      def index
        render json: User.page(params[:page])
      end
    end
  end
end

