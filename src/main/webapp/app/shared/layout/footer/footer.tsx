import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

import appConfig from 'app/config/constants';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="3">
        <p>
          <Translate contentKey="footer.top">TOP</Translate>
        </p>
      </Col>
      <Col md="3">
        <p>
          <Translate contentKey="footer.search">Search</Translate>
        </p>
      </Col>
      <Col md="3">
        <p>
          <Translate contentKey="footer.agreement">Agreements</Translate>
        </p>
      </Col>
      <Col md="3">
        <p>
          <Translate contentKey="footer.overview">Overview</Translate>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
