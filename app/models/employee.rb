class Employee < ApplicationRecord
  has_secure_password
  has_many :review_received, class_name: 'Review', foreign_key: 'employee_to_id', dependent: :nullify
  has_many :review_sent, class_name: 'Review', foreign_key: 'employee_from_id', dependent: :nullify
  enum role: [:user, :admin]
end
