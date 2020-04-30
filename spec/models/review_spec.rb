require 'rails_helper'

RSpec.describe Review, type: :model do
  before do
    @employee1 = create(:employee)
    @employee2 = create(:employee)
  end

  it 'is valid with a correct params' do
    review = create(:review, employee_to_id: @employee2.id, employee_from_id: @employee1.id)
    expect(review).to be_valid
  end

  it 'is not valid without employee_to_id' do
    expect{create(:review, employee_to_id: nil)}.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'is not valid without employee_from_id' do
    expect{create(:review, employee_from_id: nil)}.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'Finished_at not automatically updated when review created' do
    review = create(:review, employee_to_id: @employee2.id, employee_from_id: @employee1.id)
    expect(review.finished_at).to eq(nil)
  end

  it 'Finished_at automatically updated when rating is updated' do
    review = create(:review, employee_to_id: @employee2.id, employee_from_id: @employee1.id)
    review.update!(rating:3)
    expect(review.finished_at).to_not eq(nil)
  end

  it 'Finished_at not automatically updated when rating not updated' do
    review = create(:review, employee_to_id: @employee2.id, employee_from_id: @employee1.id)
    review.update!(employee_from_id: @employee2.id)
    expect(review.finished_at).to eq(nil)
  end

  it 'Employee_id nil if Employee is deleted' do
    review = create(:review, employee_to_id: @employee2.id, employee_from_id: @employee1.id)
    @employee1.destroy
    binding.pry
    expect(review.employee_from).to eq(nil)
  end
end
