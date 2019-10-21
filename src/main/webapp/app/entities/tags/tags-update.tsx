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
import { getEntity, updateEntity, createEntity, reset } from './tags.reducer';
import { ITags } from 'app/shared/model/tags.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITagsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITagsUpdateState {
  isNew: boolean;
  itemsId: string;
}

export class TagsUpdate extends React.Component<ITagsUpdateProps, ITagsUpdateState> {
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
      const { tagsEntity } = this.props;
      const entity = {
        ...tagsEntity,
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
    this.props.history.push('/entity/tags');
  };

  render() {
    const { tagsEntity, items, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="reviewComparisonApp.tags.home.createOrEditLabel">
              <Translate contentKey="reviewComparisonApp.tags.home.createOrEditLabel">Create or edit a Tags</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tagsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tags-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="reviewComparisonApp.tags.name">Name</Translate>
                  </Label>
                  <AvField id="tags-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="cleatedLabel" for="cleated">
                    <Translate contentKey="reviewComparisonApp.tags.cleated">Cleated</Translate>
                  </Label>
                  <AvInput
                    id="tags-cleated"
                    type="datetime-local"
                    className="form-control"
                    name="cleated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.tagsEntity.cleated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedLabel" for="updated">
                    <Translate contentKey="reviewComparisonApp.tags.updated">Updated</Translate>
                  </Label>
                  <AvInput
                    id="tags-updated"
                    type="datetime-local"
                    className="form-control"
                    name="updated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.tagsEntity.updated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="items.id">
                    <Translate contentKey="reviewComparisonApp.tags.items">Items</Translate>
                  </Label>
                  <AvInput id="tags-items" type="select" className="form-control" name="items.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/tags" replace color="info">
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
  tagsEntity: storeState.tags.entity,
  loading: storeState.tags.loading,
  updating: storeState.tags.updating,
  updateSuccess: storeState.tags.updateSuccess
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
)(TagsUpdate);
