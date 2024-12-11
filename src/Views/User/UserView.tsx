import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from "react-bootstrap";
import UNPHeroGallery from "../../Components/unp/UNPHeroGallery";
import UNPStickyLayout from "../../Components/unp/UNPStickyLayout";
import UNPServicesOffered from "../../Components/unp/UNPServicesOffered";
import UNPActiveCampaigns from "../../Components/unp/UNPActiveCampaigns";
import UNPLocation from "../../Components/unp/UNPLocation";
import { EntityService } from '../../firebase/services/entityService';
import { useAuthContext } from '../../firebase/auth/AuthProvider';

interface ProfileData {
  published: boolean;
  heroImages: string[]; // Array of image URLs for the hero banner
  profileInfo: {
    name: string;
    description: string;
    aboutUs?: string;
    services?: string[];
    location: string;
    logo?: string;
    ratingSummary?: Object;
  };
}

const UserView: FC = () => {
  const { user, loading } = useAuthContext()
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setLoading] = useState(loading);
  const [error, setError] = useState<string | null>(null);
  console.log('profileData', profileData)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if(!user) return setError("Profile data not found.");
        const data = await EntityService.getUserProfile(user.userId);

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

  const { heroImages, profileInfo } = profileData;

  return (
    <Container fluid style={{ backgroundColor: 'offwhite' }} className={`px-md-5 pt-md-3`}>
      {/* Hero Section */}
      <UNPHeroGallery images={heroImages} />

      <div className='p-3'>
        <UNPStickyLayout
          dataTitle="About Us"
          dataContent={profileInfo.description}
          entityInfo={{
            logo: profileInfo.logo,
            name: profileInfo.name,
            description: profileInfo.description,
            location: profileInfo.location,
            services: profileInfo.services,
          }}
        >
          {profileInfo.services && (
            <Row>
              <UNPServicesOffered services={profileInfo.services} />
            </Row>
          )}
          {profileInfo.ratingSummary && (
            <Row>
              {/* <UNPActiveCampaigns campaigns={profileInfo.ratingSummary} /> */}
            </Row>
          )}
          <Row>
            <UNPLocation locations={[{ description: 'Test', lat: 152, lng: 1535 }]} />
          </Row>
        </UNPStickyLayout>
      </div>
    </Container>
  );
};

export default UserView;
