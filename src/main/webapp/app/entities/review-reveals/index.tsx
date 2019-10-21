import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReviewReveals from './review-reveals';
import ReviewRevealsDetail from './review-reveals-detail';
import ReviewRevealsUpdate from './review-reveals-update';
import ReviewRevealsDeleteDialog from './review-reveals-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReviewRevealsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReviewRevealsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReviewRevealsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReviewReveals} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ReviewRevealsDeleteDialog} />
  </>
);

export default Routes;
