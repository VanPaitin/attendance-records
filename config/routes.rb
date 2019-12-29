Rails.application.routes.draw do
  root 'home#index'
  resources 'attendances', only: :index
  resources 'services', only: :index
  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
