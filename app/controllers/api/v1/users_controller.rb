module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :ensure_login, except: :index
      before_action :ensure_admin, only: :index

      def index
        render json: User.page(params[:page])
      end

      def create
        @user = User.new(user_params)
        if @user.save

        else
          render 'users/new'
        end
      end

      def update

      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      end
    end
  end
end

