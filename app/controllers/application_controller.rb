class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :authenticate_request
  
  def authenticate_request
    @current_user = Employee.find(decoded_auth_token['id']) if decoded_auth_token
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def decoded_auth_token
    begin
      JWT.decode(http_auth_header, Rails.application.secrets.secret_key_base)[0]
    rescue
      nil
    end
  end

  def http_auth_header
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end
  end

  def not_found
    render json: { error: 'not_found'}, status: :not_found
  end
end
