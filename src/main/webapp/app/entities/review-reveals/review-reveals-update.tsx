import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItems } from 'app/shared/model/items.model';
import { getEntities as getItems } from 'app/entities/items/items.reducer';
import { getEntity, updateEntity, createEntity, reset } from './review-reveals.reducer';
import { IReviewReveals } from 'app/shared/model/review-reveals.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewRevealsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReviewRevealsUpdateState {
  isNew: boolean;
  itemsId: string;
}

export class ReviewRevealsUpdate extends React.Component<IReviewRevealsUpdateProps, IReviewRevealsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      itemsId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getItems();
  }

  saveEntity = (event, errors, values) => {
    values.cleated = convertDateTimeToServer(values.cleated);
    values.updated = convertDateTimeToServer(values.updated);

    if (errors.length === 0) {
      const { reviewRevealsEntity } = this.props;
      const entity = {
        ...reviewRevealsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/review-reveals');
  };

  render() {
    const { reviewRevealsEntity, items, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="reviewComparisonApp.reviewReveals.home.createOrEditLabel">
              <Translate contentKey="reviewComparisonApp.reviewReveals.home.createOrEditLabel">Create or edit a ReviewReveals</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reviewRevealsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="review-reveals-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="itemIdLabel" for="itemId">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.itemId">Item Id</Translate>
                  </Label>
                  <AvField id="review-reveals-itemId" type="string" className="form-control" name="itemId" />
                </AvGroup>
                <AvGroup>
                  <Label id="tanteiRatioLabel" for="tanteiRatio">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiRatio">Tantei Ratio</Translate>
                  </Label>
                  <AvField id="review-reveals-tanteiRatio" type="string" className="form-control" name="tanteiRatio" />
                </AvGroup>
                <AvGroup>
                  <Label id="tanteiReviewLabel" for="tanteiReview">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.tanteiReview">Tantei Review</Translate>
                  </Label>
                  <AvField id="review-reveals-tanteiReview" type="string" className="form-control" name="tanteiReview" />
                </AvGroup>
                <AvGroup>
                  <Label id="checkerRatioLabel" for="checkerRatio">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.checkerRatio">Checker Ratio</Translate>
                  </Label>
                  <AvField id="review-reveals-checkerRatio" type="string" className="form-control" name="checkerRatio" />
                </AvGroup>
                <AvGroup>
                  <Label id="checkerReviewLabel" for="checkerReview">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.checkerReview">Checker Review</Translate>
                  </Label>
                  <AvField id="review-reveals-checkerReview" type="string" className="form-control" name="checkerReview" />
                </AvGroup>
                <AvGroup>
                  <Label id="filterdRatioLabel" for="filterdRatio">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.filterdRatio">Filterd Ratio</Translate>
                  </Label>
                  <AvField id="review-reveals-filterdRatio" type="string" className="form-control" name="filterdRatio" />
                </AvGroup>
                <AvGroup>
                  <Label id="filterdReviewLabel" for="filterdReview">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.filterdReview">Filterd Review</Translate>
                  </Label>
                  <AvField id="review-reveals-filterdReview" type="string" className="form-control" name="filterdReview" />
                </AvGroup>
                <AvGroup>
                  <Label id="cleatedLabel" for="cleated">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.cleated">Cleated</Translate>
                  </Label>
                  <AvInput
                    id="review-reveals-cleated"
                    type="datetime-local"
                    className="form-control"
                    name="cleated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reviewRevealsEntity.cleated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedLabel" for="updated">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.updated">Updated</Translate>
                  </Label>
                  <AvInput
                    id="review-reveals-updated"
                    type="datetime-local"
                    className="form-control"
                    name="updated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reviewRevealsEntity.updated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="items.id">
                    <Translate contentKey="reviewComparisonApp.reviewReveals.items">Items</Translate>
                  </Label>
                  <AvInput id="review-reveals-items" type="select" className="form-control" name="items.id">
                    <option value="" key="0" />
                    {items
                      ? items.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/review-reveals" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  items: storeState.items.entities,
  reviewRevealsEntity: storeState.reviewReveals.entity,
  loading: storeState.reviewReveals.loading,
  updating: storeState.reviewReveals.updating,
  updateSuccess: storeState.reviewReveals.updateSuccess
});

const mapDispatchToProps = {
  getItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewRevealsUpdate);
