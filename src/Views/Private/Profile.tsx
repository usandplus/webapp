import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomCard from './../../Components/CustomCard'
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string,
  description: string,
  location: string,
  price: string
}

const Profile: React.FC = () => {
  const defaultProfile = {
    name: 'Company A',
    description: 'This is company A',
    location: 'City Center, 1234 Street',
    price: '$200/night'
  };

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const navigate = useNavigate();

  const onEditClick = () => {
    setEditMode(true);
  }

  const onSaveClick = () => {
    setEditMode(false);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      

    </Container>
  );
}

export default Profile;

