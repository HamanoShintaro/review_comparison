import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './items.reducer';
import { IItems } from 'app/shared/model/items.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Items extends React.Component<IItemsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { itemsList, match } = this.props;
    return (
      <div>
        <h2 id="items-heading">
          <Translate contentKey="reviewComparisonApp.items.home.title">Items</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="reviewComparisonApp.items.home.createLabel">Create new Items</Translate>
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
                  <Translate contentKey="reviewComparisonApp.items.amazonId">Amazon Id</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.reviewNumber">Review Number</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.reviewEvaluation">Review Evaluation</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.linkUrl">Link Url</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.cleated">Cleated</Translate>
                </th>
                <th>
                  <Translate contentKey="reviewComparisonApp.items.updated">Updated</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {itemsList.map((items, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${items.id}`} color="link" size="sm">
                      {items.id}
                    </Button>
                  </td>
                  <td>{items.amazonId}</td>
                  <td>{items.name}</td>
                  <td>{items.price}</td>
                  <td>{items.reviewNumber}</td>
                  <td>{items.reviewEvaluation}</td>
                  <td>{items.linkUrl}</td>
                  <td>
                    <TextFormat type="date" value={items.cleated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={items.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${items.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${items.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${items.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ items }: IRootState) => ({
  itemsList: items.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
