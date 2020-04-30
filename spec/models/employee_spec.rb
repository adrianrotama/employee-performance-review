# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Employee, type: :model do
  before do
    @employee = build(:employee)
  end

  it 'is valid with a correct params' do
    expect(@employee).to be_valid
  end

  it 'is not valid with a blank email' do
    expect{create(:employee, email: nil)}.to raise_error(ActiveRecord::NotNullViolation)
  end

  it 'is not valid with a blank password' do
    expect{create(:employee, password: nil)}.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'is not valid with a blank name' do
    expect{create(:employee, name: nil)}.to raise_error(ActiveRecord::NotNullViolation)
  end

  it 'is not valid with a blank role' do
    expect{create(:employee, role: nil)}.to raise_error(ActiveRecord::NotNullViolation)
  end

  it 'password is encrypted' do
    employee = create(:employee, password: 'password')
    expect(Employee.find(employee.id).password).to_not eq('password')
  end

  it 'password is encrypted' do
    employee = create(:employee, password: 'password')
    expect(Employee.find(employee.id).password).to_not eq('password')
  end

  it 'return role admin' do
    employee = build(:employee, role: 1)
    expect(employee.role).to eq('admin')
  end

  it 'return role user' do
    employee = build(:employee, role: 0)
    expect(employee.role).to eq('user')
  end

  it 'return correct reviews received' do
    employee1 = create(:employee)
    employee2 = create(:employee)
    review = create(:review, employee_to_id: employee1.id, employee_from_id: employee2.id)
    expect(employee1.review_received.length).to eq(1)
    expect(employee1.review_sent.length).to eq(0)
    expect(employee1.review_received.first.employee_to.name).to eq(employee1.name)
    expect(employee1.review_received.first.employee_from.name).to eq(employee2.name)
  end

  it 'return correct reviews sent' do
    employee1 = create(:employee)
    employee2 = create(:employee)
    review = create(:review, employee_to_id: employee2.id, employee_from_id: employee1.id)
    expect(employee1.review_received.length).to eq(0)
    expect(employee1.review_sent.length).to eq(1)
    expect(employee1.review_sent.first.employee_from.name).to eq(employee1.name)
    expect(employee1.review_sent.first.employee_to.name).to eq(employee2.name)
  end
end
