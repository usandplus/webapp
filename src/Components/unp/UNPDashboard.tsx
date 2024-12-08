import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// Types for the shortcut items
interface ShortcutItem {
  title: string;
  description: string;
  icon?: React.ReactNode; // Optional icon
  onClick?: () => void;
}

interface UNPDashboardProps {
  // Indicates if the current context is user or entity
  isEntityContext: boolean;
  // Data for shortcuts
  shortcuts: ShortcutItem[];
  // Feed data could be an array of items, for demonstration we'll just say string[]
  feedItems: string[];
  // This could represent what goes on the left column (e.g. recommended actions, stats, etc.)
  leftColumnContent?: React.ReactNode;
}

const UNPDashboard: React.FC<UNPDashboardProps> = ({
  isEntityContext,
  shortcuts,
  feedItems,
  leftColumnContent
}) => {
  return (
    <div className="">
      {/* Top Row of Shortcut Cards */}
      <Row className="mb-4">
        {shortcuts.map((item, index) => (
          <Col key={index} md={3}>
            <Card className="mb-3" onClick={item.onClick} style={{ cursor: 'pointer' }}>
              <Card.Body className="d-flex align-items-center">
                {item.icon && <div className="me-3">{item.icon}</div>}
                <div>
                  <Card.Title className='text-primary fw-bolder'>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Section: Left and Right columns */}
      <Row>
        {/* Left Column */}
        <Col md={8}>
          {leftColumnContent ? (
            leftColumnContent
          ) : (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className='text-primary fw-bolder'>Left Column Content</Card.Title>
                <Card.Text>
                  {/* This could be stats, charts, actions the user can take, 
                      recently accessed campaigns, etc. */}
                  Placeholder for left column content
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Right Column: Feed */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className='text-primary fw-bolder'>{isEntityContext ? 'Who Follows You' : 'Who You Follow'}</Card.Title>
              {feedItems.length > 0 ? (
                feedItems.map((item, idx) => (
                  <div key={idx} className="mb-2">
                    {item}
                  </div>
                ))
              ) : (
                <Card.Text>No updates at the moment.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UNPDashboard;
