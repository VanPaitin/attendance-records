module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :ensure_login, only: :create

      def create
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
          token = JsonWebToken.issue_token(@user)
          render json: { success: 'Successfully logged in', auth_token: token },
                 status: 200
        else
          render json: { error: 'Wrong email or password supplied' },
                 status: 422
        end
      end

      def destroy
        token = request.headers["Authorization"]

        BlacklistedToken.create(token: token)

        render json: { success: 'Successfully logged out' }, status: 200
      end
    end
  end
end

