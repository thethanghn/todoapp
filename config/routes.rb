Rails.application.routes.draw do

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :categories
      resources :items do
        member do
          get :complete
        end
      end
    end
  end
end
