import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './items.reducer';
import { IItems } from 'app/shared/model/items.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ItemsDetail extends React.Component<IItemsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { itemsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="reviewComparisonApp.items.detail.title">Items</Translate> [<b>{itemsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="amazonId">
                <Translate contentKey="reviewComparisonApp.items.amazonId">Amazon Id</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.amazonId}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="reviewComparisonApp.items.name">Name</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.name}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="reviewComparisonApp.items.price">Price</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.price}</dd>
            <dt>
              <span id="reviewNumber">
                <Translate contentKey="reviewComparisonApp.items.reviewNumber">Review Number</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.reviewNumber}</dd>
            <dt>
              <span id="reviewEvaluation">
                <Translate contentKey="reviewComparisonApp.items.reviewEvaluation">Review Evaluation</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.reviewEvaluation}</dd>
            <dt>
              <span id="linkurl">
                <Translate contentKey="reviewComparisonApp.items.linkurl">Linkurl</Translate>
              </span>
            </dt>
            <dd>{itemsEntity.linkurl}</dd>
            <dt>
              <span id="cleated">
                <Translate contentKey="reviewComparisonApp.items.cleated">Cleated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={itemsEntity.cleated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updated">
                <Translate contentKey="reviewComparisonApp.items.updated">Updated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={itemsEntity.updated} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/items" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/items/${itemsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ items }: IRootState) => ({
  itemsEntity: items.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsDetail);
