FactoryBot.define do
  factory :employee do
    sequence(:name) {|n| "name_#{n}"}
    sequence(:email) {|n| "email_#{n}@example.com"}
    password {'admin'}
    role {1}
  end
end
