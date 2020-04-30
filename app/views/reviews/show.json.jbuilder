json.id      @review.id
json.created_at @review.created_at.strftime('%Y-%m-%d %H:%M:%S')
json.employee_to do
  json.id    @review.employee_to_id
  json.name  @review.employee_to&.name
end
json.employee_from do
  json.id    @review.employee_from_id
  json.name  @review.employee_from&.name
end
json.rating  @review.rating
json.reviews @review.reviews