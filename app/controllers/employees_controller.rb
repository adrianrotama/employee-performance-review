class EmployeesController < ApplicationController
  def index
    employees = Employee.order("created_at DESC")
    render json: employees
  end

  def show
    employee = Employee.find(params[:id])
    render json: employee
  end

  def create
    employee = Employee.create(employee_params)
    render json: employee
  end

  def update
    employee = Employee.find(params[:id])
    employee.update_attributes(employee_params)
    render json: employee
  end

  def destroy
    employee = Employee.find(params[:id])
    employee.destroy
    head :no_content, status: :ok
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :email, :password, :role)
  end

  # def get_company_info
  #   survey_url =  SurveyUrl.find_by_uuid(params[:survey_uuid])
  #   if survey_url.present?
  #     logo_url = survey_url.survey.company.logo_url
  #     response = {logo_url: logo_url}
  #     render json: response
  #   else
  #     render json: Message.new(message: 'Failed')
  #   end 
  # end
end
