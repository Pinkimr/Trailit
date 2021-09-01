import React, {useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from '../layout/main'
import IntroCategory from '../pages/Setup/IntroCategory'
import CreatorProfile from '../pages/creator-profile/CreatorProfile'
import CreatorTrailDetails from '../pages/creator-trail-details/CreatorTrailDetails'
import Dashboard from '../pages/dashboard/Dashboard'
import Home from '../pages/home/Home'
import Categories from '../pages/dashboard/Categories'

import ProtectedRoute from './ProtectedRoute'
import withToast from '../HOC/withToast'
import UserProfile from '../components/profile/UserProfile'
import AccountPage from '../pages/acount/AccountPage'
import EditTrail from '../pages/acount/EditTrail'
import ViewAllTrails from '../pages/dashboard/ViewAllTrails'
import PageNotFound from '../pages/PageNotFound'
import {GlobalContext} from '../context/globalContext'

const Routes = props => {
  const {isLoggedIn} = useContext(GlobalContext)

  return (
    <Main>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          render={props => (isLoggedIn ? <Dashboard {...props} /> : <Home {...props} />)}
        />
        <ProtectedRoute exact path="/profile/:id" render={props => <CreatorProfile {...props} />} />

        <ProtectedRoute exact path="/categories" render={props => <Categories {...props} />} />
        <ProtectedRoute exact path="/trails/filter" render={props => <ViewAllTrails {...props} />} />
        <ProtectedRoute exact path="/trail/:trailSlug" render={props => <CreatorTrailDetails {...props} />} />
        <ProtectedRoute exact path="/profile" render={props => <AccountPage {...props} />} />
        <ProtectedRoute exact path="/edit-trail/:trailSlug" render={props => <EditTrail {...props} />} />

        <ProtectedRoute exact path="/setup" render={props => <IntroCategory {...props} />} />
        <ProtectedRoute exact path="/settings" render={props => <UserProfile {...props} />} />

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Main>
  )
}

export default withToast(Routes)
