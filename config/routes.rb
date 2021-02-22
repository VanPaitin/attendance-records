Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:new, :create, :update, :destroy]
      resources :sessions, only: [:create]
      delete :sessions, to: 'sessions#destroy'
      resources :invites, only: [:create, :index, :destroy] do
        put :resend, on: :collection
      end
      resources :roles, only: :index
    end
  end
  resources :users, only: [:new, :edit]
  resources 'attendances', except: [:new, :edit]
  resources 'services', only: :index
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
