
import React, {useState} from 'react';
import withEditMode from '../../Components/hocs/withEditMode';
import UNPButton from '../../Components/unp/UNPButton';

interface OrganizationViewProps {
    editMode: boolean;
}

const OrganizationView: React.FC<OrganizationViewProps> = ({ editMode }) => {
    const [name, setName] = useState('Organization Name');
    const [description, setDescription] = useState('Organization Description');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the logic to save the updated organization details
        console.log({ name, description });
    };

    return (
        <div>
            <h2>Organization Details</h2>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <UNPButton type="submit">Save Changes</UNPButton>
                </form>
            ) : (
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};

export default withEditMode(OrganizationView);