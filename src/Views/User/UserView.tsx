import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from "react-bootstrap";
import UNPHeroGallery from "../../Components/unp/UNPHeroGallery";
import UNPStickyLayout from "../../Components/unp/UNPStickyLayout";
import UNPServicesOffered from "../../Components/unp/UNPServicesOffered";
import UNPActiveCampaigns from "../../Components/unp/UNPActiveCampaigns";
import UNPLocation from "../../Components/unp/UNPLocation";
import { EntityService } from '../../firebase/services/entityService';
import { useAuthContext } from '../../firebase/auth/AuthProvider';
import { UNPBasePublicUser } from '../../types/models/common';

const UserView: FC = () => {
  const { user, loading } = useAuthContext()
  const [profileData, setProfileData] = useState<UNPBasePublicUser | null>(null);
  const [isLoading, setLoading] = useState(loading);
  const [error, setError] = useState<string | null>(null);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  console.log('profileData', profileData)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if(!user) return setError("Profile data not found.");
        const data = await EntityService.getUserProfile(user.userId!);

        if (!data) {
          setError("Profile data not found.");
          return;
        }

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h3 className="text-danger">{error}</h3>
      </Container>
    );
  }

  if (!profileData) {
    return null; // Fallback in case profile data is unexpectedly null
  }

  return (
    <Container fluid style={{ backgroundColor: 'offwhite' }} className={`px-md-5 pt-md-3`}>
      {/* Hero Section */}
      <UNPHeroGallery images={heroImages} />

      <div className='p-3'>
        <UNPStickyLayout
          entityInfo={{
            logo: profileData.logo,
            name: profileData.displayName,
            description: profileData.description,
            services: profileData.services,
          }}
        >
          {profileData.services && (
            <Row>
              <UNPServicesOffered services={profileData.services} />
            </Row>
          )}
          {/* {profileData.ratingSummary && (
            <Row> 
               <UNPActiveCampaigns campaigns={profileData.ratingSummary} /> 
            </Row>
          )} */}
          <Row>
            <UNPLocation locations={[{ description: 'Test', lat: 152, lng: 1535 }]} />
          </Row>
        </UNPStickyLayout>
      </div>
    </Container>
  );
};

export default UserView;
