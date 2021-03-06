namespace :start do
  desc 'Start development server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run build && cd frontend'
  end
end

task :start => 'start:development'