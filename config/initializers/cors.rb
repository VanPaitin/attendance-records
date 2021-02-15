Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*', headers: :any, methods: %i(get put post patch delete options head)
  end
end
