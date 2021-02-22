class ApplicationController < ActionController::Base
  include ErrorHandling

  before_action :ensure_login

  def current_user
    token = request.headers["Authorization"]

    raise NotAuthenticatedError if token.blank? || BlacklistedToken.find_by_token(token)

    @current_user ||= User.find_by(id: JsonWebToken.payload_token(token)[:user_id])
  end

  def ensure_login
    raise NotAuthenticatedError unless current_user.present?
  end

  def ensure_admin
    unless current_user.roles.exists? name: 'admin'
      raise NotAuthorizedError
    end
  end
end
