import React from 'react';
import UNPAdminLayout from '../../Components/unp/UNPAdminLayout';
import UNPDashboard from '../../Components/unp/UNPDashboard';
import UNPUserDocumentManager from '../../Components/unp/UNPUserDocumentManager';
import UNPTransactionHistory from '../../Components/unp/UNPTransactionHistory';
import UNPEditUserProfile from '../../Components/unp/UNPEditUserProfile';
import { useAuthContext } from '../../firebase/auth/AuthProvider';

// Example sections for Empresa
const UserAdmin: React.FC = () => {
    const {user, loading, userMemberships} = useAuthContext()
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
        { name: 'Tu Perfil', label: 'Tu Perfil', component: <UNPEditUserProfile userId={user?.userId!} /> },
        { name: 'Documentos', label: 'Documentos', component: <UNPUserDocumentManager /> },
        { name: 'Historial', label: 'Historial', component: <UNPTransactionHistory /> },
    ];

    const links = [
        { name: 'Perfil', path: '/perfil'}
    ]

    return (
        <UNPAdminLayout links={links} sections={sections} />
    );
};

export default UserAdmin;
