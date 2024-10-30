// src/components/unp/UNPSidebar.tsx

import React from 'react';
import { Nav } from 'react-bootstrap';

interface UNPSidebarProps {
  items: { name: string; path: string }[];
}

const UNPSidebar: React.FC<UNPSidebarProps> = ({ items }) => {
  return (
    <div className="unp-sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
        {items.map((item) => (
          <Nav.Link key={item.name} href={item.path}>
            {item.name}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default UNPSidebar;
