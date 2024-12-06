import React from 'react';
import UNPAdminLayout from '../../Components/unp/UNPAdminLayout';
import UNPDocumentManager from '../../Components/unp/UNPDocumentManager';
import UNPCollaboratorManager from '../../Components/unp/UNPCollaboratorManager';
import UNPAnalytics from '../../Components/unp/UNPAnalytics';
import UNPDashboard from '../../Components/unp/UNPDashboard';

// Example sections for Empresa
const UserAdmin: React.FC = () => {
    const sections = [
        {
            name: 'Dashboard', label: 'Dashboard', component: <UNPDashboard
                isEntityContext={false} shortcuts={
                    [
                        {
                            title: 'Mision 1',
                            description: 'Descripcion de la mision 1'
                        },
                        {
                            title: 'Mision 2',
                            description: 'Descripcion de la mision 2'
                        },
                        {
                            title: 'Mision 3',
                            description: 'Descripcion de la mision 3'
                        },
                    ]
                }
                feedItems={['test']}
            />
        },
        { name: 'Documentos', label: 'Documentos', component: <UNPDocumentManager /> },
        { name: 'Personas', label: 'Personas', component: <UNPCollaboratorManager /> },
        { name: 'Estadisticas', label: 'Estadisticas', component: <UNPAnalytics /> },];

    return (
        <UNPAdminLayout sections={sections} />
    );
};

export default UserAdmin;
