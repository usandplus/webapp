// src/components/unp/KeyMetrics.tsx

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

interface Metric {
  label: string;
  value: string | number;
}

interface KeyMetricsProps {
  metrics: Metric[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics }) => {
  return (
    <Row className="key-metrics">
      {metrics.map((metric, index) => (
        <Col xs={6} md={4} key={index} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{metric.value}</Card.Title>
              <Card.Text>{metric.label}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KeyMetrics;
