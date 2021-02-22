module Api
  module V1
    class AdminController < ApplicationController
      before_action :ensure_admin

      def index
        render json: User.page(params[:page])
      end

      def edit

      end
    end
  end
end

