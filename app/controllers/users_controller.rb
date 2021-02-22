class UsersController < ApplicationController
  skip_before_action :ensure_login, only: :new
  before_action :ensure_valid_token

  def new
    @user = User.new
  end

  def edit
    @user = User.find_by(params[:id])
  end

  private

  def ensure_valid_token
    @invite = Invite.find_by_token(params[:token], recipient_id: nil)

    render json: { message: 'Invalid invitation link' }, status: 422 unless @invite
  end
end
