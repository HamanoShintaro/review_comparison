import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Items from './items';
import Tags from './tags';
import ReviewReveals from './review-reveals';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/items`} component={Items} />
      <ErrorBoundaryRoute path={`${match.url}/tags`} component={Tags} />
      <ErrorBoundaryRoute path={`${match.url}/review-reveals`} component={ReviewReveals} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
