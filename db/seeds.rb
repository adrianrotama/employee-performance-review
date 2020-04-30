Employee.create(
  email: 'admin@example.com',
  password: 'admin',
  name: 'Admin',
  role: 1
)
Employee.create(
  email: 'userA@example.com',
  password: 'a',
  name: 'User A',
  role: 0
)
Employee.create(
  email: 'userB@example.com',
  password: 'b',
  name: 'User B',
  role: 0
)
Employee.create(
  email: 'userC@example.com',
  password: 'c',
  name: 'User C',
  role: 0
)
Review.create(
  employee_from_id: 1,
  employee_to_id: 2
)
Review.create(
  employee_from_id: 1,
  employee_to_id: 3
)
Review.create(
  employee_from_id: 2,
  employee_to_id: 1,
  rating: 4,
  reviews: 'Good Job!',
  finished_at: Time.now
)
Review.create(
  employee_from_id: 3,
  employee_to_id: 1,
  rating: 5,
  reviews: 'Fantastic!',
  finished_at: Time.now
)