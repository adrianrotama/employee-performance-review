class AuthController < ApplicationController
  skip_before_action :authenticate_request
  def login
    employee = Employee.find_by(email: params[:email])
    if employee && employee.authenticate(params[:password])
      payload = {id: employee.id}
      token = JWT.encode(payload, Rails.application.secrets.secret_key_base)
      render json: {employee: employee, jwt: token}
    else
      render json: {errors: 'Log in failed! Invalid username or password'}
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: 'No user logged in'}
    end
  end
end