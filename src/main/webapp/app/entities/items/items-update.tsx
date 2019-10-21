import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReviewReveals } from 'app/shared/model/review-reveals.model';
import { getEntities as getReviewReveals } from 'app/entities/review-reveals/review-reveals.reducer';
import { ITags } from 'app/shared/model/tags.model';
import { getEntities as getTags } from 'app/entities/tags/tags.reducer';
import { getEntity, updateEntity, createEntity, reset } from './items.reducer';
import { IItems } from 'app/shared/model/items.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IItemsUpdateState {
  isNew: boolean;
  idstags: any[];
  reviewRevealsId: string;
}

export class ItemsUpdate extends React.Component<IItemsUpdateProps, IItemsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstags: [],
      reviewRevealsId: '0',
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

    this.props.getReviewReveals();
    this.props.getTags();
  }

  saveEntity = (event, errors, values) => {
    values.cleated = convertDateTimeToServer(values.cleated);
    values.updated = convertDateTimeToServer(values.updated);

    if (errors.length === 0) {
      const { itemsEntity } = this.props;
      const entity = {
        ...itemsEntity,
        ...values,
        tags: mapIdList(values.tags)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/items');
  };

  render() {
    const { itemsEntity, reviewReveals, tags, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="reviewComparisonApp.items.home.createOrEditLabel">
              <Translate contentKey="reviewComparisonApp.items.home.createOrEditLabel">Create or edit a Items</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itemsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="items-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="amazonIdLabel" for="amazonId">
                    <Translate contentKey="reviewComparisonApp.items.amazonId">Amazon Id</Translate>
                  </Label>
                  <AvField id="items-amazonId" type="text" name="amazonId" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="reviewComparisonApp.items.name">Name</Translate>
                  </Label>
                  <AvField id="items-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="reviewComparisonApp.items.price">Price</Translate>
                  </Label>
                  <AvField id="items-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="reviewNumberLabel" for="reviewNumber">
                    <Translate contentKey="reviewComparisonApp.items.reviewNumber">Review Number</Translate>
                  </Label>
                  <AvField id="items-reviewNumber" type="string" className="form-control" name="reviewNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="reviewEvaluationLabel" for="reviewEvaluation">
                    <Translate contentKey="reviewComparisonApp.items.reviewEvaluation">Review Evaluation</Translate>
                  </Label>
                  <AvField id="items-reviewEvaluation" type="string" className="form-control" name="reviewEvaluation" />
                </AvGroup>
                <AvGroup>
                  <Label id="linkUrlLabel" for="linkUrl">
                    <Translate contentKey="reviewComparisonApp.items.linkUrl">Link Url</Translate>
                  </Label>
                  <AvField id="items-linkUrl" type="text" name="linkUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="cleatedLabel" for="cleated">
                    <Translate contentKey="reviewComparisonApp.items.cleated">Cleated</Translate>
                  </Label>
                  <AvInput
                    id="items-cleated"
                    type="datetime-local"
                    className="form-control"
                    name="cleated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.itemsEntity.cleated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedLabel" for="updated">
                    <Translate contentKey="reviewComparisonApp.items.updated">Updated</Translate>
                  </Label>
                  <AvInput
                    id="items-updated"
                    type="datetime-local"
                    className="form-control"
                    name="updated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.itemsEntity.updated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="reviewReveals.id">
                    <Translate contentKey="reviewComparisonApp.items.reviewReveals">Review Reveals</Translate>
                  </Label>
                  <AvInput id="items-reviewReveals" type="select" className="form-control" name="reviewReveals.id">
                    <option value="" key="0" />
                    {reviewReveals
                      ? reviewReveals.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="tags">
                    <Translate contentKey="reviewComparisonApp.items.tags">Tags</Translate>
                  </Label>
                  <AvInput
                    id="items-tags"
                    type="select"
                    multiple
                    className="form-control"
                    name="tags"
                    value={itemsEntity.tags && itemsEntity.tags.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {tags
                      ? tags.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/items" replace color="info">
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
  reviewReveals: storeState.reviewReveals.entities,
  tags: storeState.tags.entities,
  itemsEntity: storeState.items.entity,
  loading: storeState.items.loading,
  updating: storeState.items.updating,
  updateSuccess: storeState.items.updateSuccess
});

const mapDispatchToProps = {
  getReviewReveals,
  getTags,
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
)(ItemsUpdate);
