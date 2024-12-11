import React from 'react';
import UNPAdminLayout from '../../Components/unp/UNPAdminLayout';
import UNPDocumentManager from '../../Components/unp/UNPDocumentManager';
import UNPCollaboratorManager from '../../Components/unp/UNPCollaboratorManager';
import UNPAnalytics from '../../Components/unp/UNPAnalytics';

// Example sections for Empresa
const CampaignAdmin: React.FC = () => {
  const sections = [
    { name: 'Documentos', label: 'Documentos', component: <UNPDocumentManager /> },
    { name: 'Personas', label: 'Personas', component: <UNPCollaboratorManager /> },
    { name: 'Estadisticas', label: 'Estadisticas', component: <UNPAnalytics /> },
  ];

  const links = [
    { name: 'Perfil', path: '/perfil'}
]

return (
    <UNPAdminLayout links={links}  sections={sections} />
  );
};

// Sample section components
const EmpresaOverview = () => <div>Overview of Empresa</div>;
const ManageConvocatorias = () => <div>Manage Convocatorias</div>;
const EditEmpresaDetails = () => <div>Edit Empresa Details</div>;
const EmpresaReports = () => <div>Empresa Reports & Analytics</div>;
const TeamManagement = () => <div>Team Management</div>;
const EmpresaSettings = () => <div>Empresa Settings</div>;

export default CampaignAdmin;
