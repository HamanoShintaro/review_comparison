import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './review-reveals.reducer';
import { IReviewReveals } from 'app/shared/model/review-reveals.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewRevealsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ReviewReveals extends React.Component<IReviewRevealsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { reviewRevealsList, match } = this.props;
    return (
      <div>
        <h2 id="review-reveals-heading">
          <Translate contentKey="reviewComparisonApp.reviewReveals.home.title">Review Reveals</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="reviewComparisonApp.reviewReveals.home.createLabel">Create new Review Reveals</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiRatio">Tantei Ratio</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiReview">Tantei Review</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.checkerRatio">Checker Ratio</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.checkerReview">Checker Review</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.filterdRatio">Filterd Ratio</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.filterdReview">Filterd Review</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.cleated">Cleated</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.reviewReveals.updated">Updated</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reviewRevealsList.map((reviewReveals, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${reviewReveals.id}`} color="link" size="sm">
                      {reviewReveals.id}
                    </Button>
                  </td>
                  <td>{reviewReveals.tanteiRatio}</td>
                  <td>{reviewReveals.tanteiReview}</td>
                  <td>{reviewReveals.checkerRatio}</td>
                  <td>{reviewReveals.checkerReview}</td>
                  <td>{reviewReveals.filterdRatio}</td>
                  <td>{reviewReveals.filterdReview}</td>
                  <td>
                    <TextFormat type="date" value={reviewReveals.cleated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={reviewReveals.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${reviewReveals.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reviewReveals.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reviewReveals.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reviewReveals }: IRootState) => ({
  reviewRevealsList: reviewReveals.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewReveals);
