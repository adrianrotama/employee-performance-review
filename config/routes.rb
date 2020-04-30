Rails.application.routes.draw do
  scope '/api/v1', defaults: { format: :json } do
    resources :employees
    resources :reviews
    get '/get_received_reviews', to: 'reviews#get_received_reviews'
    get '/get_pending_reviews', to: 'reviews#get_pending_reviews'
    get '/get_sent_reviews', to: 'reviews#get_sent_reviews'

    post "/login", to: "auth#login"
  end
end