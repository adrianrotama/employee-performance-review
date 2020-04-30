json.array! @reviews do |review|
  json.id      review.id
  json.employee_to do
    json.id    review.employee_to_id
    json.name  review.employee_to&.name
  end
  json.employee_from do
    json.id    review.employee_from_id
    json.name  review.employee_from&.name
  end
  json.rating  review.rating
  json.reviews review.reviews
  json.created_at  review.created_at.strftime('%Y-%m-%d')
  json.finished_at review.finished_at&.strftime('%Y-%m-%d')
end