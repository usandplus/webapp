import React from 'react';
import UNPAdminLayout from '../../Components/unp/UNPAdminLayout';
import UNPDocumentManager from '../../Components/unp/UNPDocumentManager';
import UNPCollaboratorManager from '../../Components/unp/UNPCollaboratorManager';
import UNPAnalytics from '../../Components/unp/UNPAnalytics';

// Example sections for Empresa
const UserView: React.FC = () => {
  const sections = [
    { name: 'Documentos', label: 'Documentos', component: <UNPDocumentManager /> },
    { name: 'Personas', label: 'Personas', component: <UNPCollaboratorManager /> },
    { name: 'Estadisticas', label: 'Estadisticas', component: <UNPAnalytics /> },  ];

  return (
    <UNPAdminLayout sections={sections} />
  );
};

export default UserView;
