import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import MenuMobile from './components/MenuMobile'

import EmployeesIndex from './pages/Employees/Index'
import EmployeesShow from './pages/Employees/Show'
import EmployeesNew from './pages/Employees/New'

import ReviewsIndex from './pages/Reviews/Index'
import ReviewsShow from './pages/Reviews/Show'
import ReviewsNew from './pages/Reviews/New'
import ReviewsEdit from './pages/Reviews/Edit'

const PrivateRoute = ({ component, ...options }) => {
  const token = localStorage.getItem('token')
  return(
    !token ?
    <Redirect to='/login'/> :
    <Route {...options} component={component}/>
    
  )
}
const AdminRoute = ({ component, ...options }) => {
  const token = localStorage.getItem('token')
  const user_information = JSON.parse(localStorage.getItem('user_information'))
  return(
    !token ?
    <Redirect to='/login'/> :
    !!user_information && user_information.role != 'admin' ?
    <Redirect to='/'/> :
    <Route {...options} component={component}/>
  )
}

const Routes = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <React.Fragment>
          <div className='content'>
            <Header/>
            <main className='d-flex'>
              <MenuBar/>
              <MenuMobile/>
              <div className='app-content flex-grow-1 align-self-start'>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <AdminRoute exact path="/employees" component={EmployeesIndex} />
                  <AdminRoute exact path="/employees/new" component={EmployeesNew} />
                  <AdminRoute exact path="/employees/:id" component={EmployeesShow} />

                  <AdminRoute exact path="/reviews" component={ReviewsIndex} />
                  <AdminRoute exact path="/reviews/new" component={ReviewsNew} />
                  <AdminRoute exact path="/reviews/:id" component={ReviewsShow} />
                  <PrivateRoute exact path="/reviews/:id/edit" component={ReviewsEdit} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </main>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  </React.Fragment>
)

export default Routes