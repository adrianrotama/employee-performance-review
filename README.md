## Employee Performance Review
Minimal Full-stack React-Rails app with role-based authentication.

This project uses the following technologies:

- [React](https://reactjs.org), [React Router](https://reacttraining.com/react-router/), [Axios](https://github.com/axios/axios) for frontend
- [Parcel](https://parceljs.org/) for web application bundler
- [Ruby on Rails](https://rubyonrails.org/) for the backend (Ruby 2.6.5, Rails 6.0.2.2)
- [Rspec](https://github.com/rspec/rspec-rails) for the backend testing
- MySQL for the database

## Features
Basic Features
- Role-based token authorization with JWT
- React Authorized Routes

Admin Views
- Add/remove/update/view employees
- Add/update/view performance reviews
- Assign employees to participate in another employee's performance review

User Views
- List of performance reviews requiring feedback
- Submit feedback

TO DO
- UI Feedback to user(when login failed, successful action, or failed action)
- Add more test case

## Quick Start

```rails
// Install dependencies for server
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed

// Run client & server (using Procfile + Rake)
$ rake start

// Client on http://localhost:3000 and Server runs on http://localhost:3001
```


## User Info
## Admin
```
Username: admin@example.com
Password: admin
```
## Normal User / Employee
```
Username: userA@example.com
Password: a

Username: userB@example.com
Password: b

Username: userC@example.com
Password: c
```
