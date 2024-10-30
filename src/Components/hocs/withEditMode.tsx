// src/components/hocs/withEditMode.tsx

import React, { useContext } from 'react';
import { AuthContext } from '../../firebase/contexts/AuthContext';

// Make the HOC accept generic props
const withEditMode = <P extends object>(WrappedComponent: React.FC<P & { editMode?: boolean }>) => {
    return (props: P) => {
        const authContext = useContext(AuthContext);
        const isAdmin = authContext?.role === 'admin';

        return (
            <WrappedComponent {...props} editMode={!isAdmin} />
        );
    };
};

export default withEditMode;
