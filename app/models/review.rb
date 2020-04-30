class Review < ApplicationRecord
  belongs_to :employee_to, class_name: 'Employee'
  belongs_to :employee_from, class_name: 'Employee'

  before_update :set_finished_at

  private

  def set_finished_at
    self.finished_at = Time.now if self.rating != 0
  end
end
