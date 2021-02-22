module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ExpirationError, with: :expired_token
    rescue_from NotAuthenticatedError, with: :not_authenticated
  end

  def expired_token
    render json: { error: 'Token expired' }, status: 401
  end

  def not_authenticated
    render json: { error: 'You need to login to continue' }, status: 401
  end

  def not_authorized
    render json: 'Sorry, you are not allowed to perform this action', status: 403
  end

  def invalid_endpoint
    render json: { error: language.invalid_endpoint }, status: 400
  end
end
