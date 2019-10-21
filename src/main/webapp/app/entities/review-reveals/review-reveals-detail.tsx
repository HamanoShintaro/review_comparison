import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review-reveals.reducer';
import { IReviewReveals } from 'app/shared/model/review-reveals.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewRevealsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReviewRevealsDetail extends React.Component<IReviewRevealsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reviewRevealsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="reviewComparisonApp.reviewReveals.detail.title">ReviewReveals</Translate> [
            <b>{reviewRevealsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="itemId">
                <Translate contentKey="reviewComparisonApp.reviewReveals.itemId">Item Id</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.itemId}</dd>
            <dt>
              <span id="tanteiRatio">
                <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiRatio">Tantei Ratio</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.tanteiRatio}</dd>
            <dt>
              <span id="tanteiReview">
                <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiReview">Tantei Review</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.tanteiReview}</dd>
            <dt>
              <span id="checkerRatio">
                <Translate contentKey="reviewComparisonApp.reviewReveals.checkerRatio">Checker Ratio</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.checkerRatio}</dd>
            <dt>
              <span id="checkerReview">
                <Translate contentKey="reviewComparisonApp.reviewReveals.checkerReview">Checker Review</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.checkerReview}</dd>
            <dt>
              <span id="filterdRatio">
                <Translate contentKey="reviewComparisonApp.reviewReveals.filterdRatio">Filterd Ratio</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.filterdRatio}</dd>
            <dt>
              <span id="filterdReview">
                <Translate contentKey="reviewComparisonApp.reviewReveals.filterdReview">Filterd Review</Translate>
              </span>
            </dt>
            <dd>{reviewRevealsEntity.filterdReview}</dd>
            <dt>
              <span id="cleated">
                <Translate contentKey="reviewComparisonApp.reviewReveals.cleated">Cleated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reviewRevealsEntity.cleated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updated">
                <Translate contentKey="reviewComparisonApp.reviewReveals.updated">Updated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={reviewRevealsEntity.updated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="reviewComparisonApp.reviewReveals.items">Items</Translate>
            </dt>
            <dd>{reviewRevealsEntity.items ? reviewRevealsEntity.items.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/review-reveals" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/review-reveals/${reviewRevealsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ reviewReveals }: IRootState) => ({
  reviewRevealsEntity: reviewReveals.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewRevealsDetail);
