import React, { useState, useEffect } from "react";
import UNPProfileLayout from "../../Components/unp/UNPProfileLayout";
import UNPReviews from "../../Components/unp/UNPReviews";
import { UNPBaseEvent, UNPBaseReview, UNPImportantPeople } from "../../types/models/common";
import UNPSpinner from "../../Components/unp/UNPSpinner";
import { EntityService } from "../../firebase/services/entityService";
import { useParams } from "react-router-dom";
import UNPUnderConstruction from "../../Components/unp/UNPUnderConstruction";
import ProfilePlaceholder from "../../Components/unp/placeholders/ProfilePlaceholder";
// import { getProfileInformation } from "../../api/profile"; // Adjust the import path as necessary
interface ProfileInfo {
  name: string;
  description: string;
  history: string;
  locationAddress: string;
  locationCity: string;
  locationCountry: string;
  locationZipcode: string;
  logo: string;
  aboutUs: string;
  services: string[];
  importantPeople: UNPImportantPeople[];
  events: UNPBaseEvent[];
  categories: string;
}
// Define the FundacionProfile interface
export interface FundacionProfile {
  achievements: string[];
  ratingSummary: {
    rating: number;
    label: string;
  }[];
  profileInfo: ProfileInfo
  heroImages: string[];
  reviews: UNPBaseReview[];
  published: boolean;
}

// Define the props interface
interface FundacionViewProps {
  testData?: boolean; // Optional prop to enable test data
}

// Hardcoded test data adhering to FundacionProfile interface
const testProfileData: FundacionProfile = {
  published: false,
  profileInfo: {
    name: 'Us & Plus',
    description: 'Una fundación es una organización privada sin fines de lucro que se caracteriza por perseguir objetivos de interés general para un grupo de beneficiarios. Se crea por la voluntad de una o varias personas, que destinan un patrimonio para la realización de sus fines.',
    history: 'Nuestra fundación fue establecida en 2010 con el objetivo de empoderar comunidades a través de la educación y el desarrollo sostenible.',
    locationAddress: 'Calle Falsa 123',
    locationCity: 'San Pedro Garza Garcia',
    locationCountry: 'Mexico',
    locationZipcode: '66220',
    logo: '/full_logo.png',
    aboutUs: 'EmpowerChange Foundation is a nonprofit fundacion dedicated to creating opportunities for underserved communities worldwide. Through education, healthcare initiatives, and sustainable development programs, we aim to break cycles of poverty and empower individuals to thrive. Our team collaborates with local leaders and volunteers to deliver impactful solutions tailored to specific needs. By fostering resilience, equity, and innovation, EmpowerChange is building a brighter future for everyone. Join us in making a lasting difference, one community at a time. Together, we transform lives!',
    services: ['Ayudamos a niños', 'Proveer educación', 'Salud comunitaria', 'Desarrollo sostenible'],
    importantPeople: [
      {
        userId: 'founder1',
        name: 'Founder Uno',
        description: 'Líder visionario con más de 20 años de experiencia en desarrollo comunitario.',
        avatarURL: '/lady.jpg'
      },
      // Add more important people as needed
    ],
    categories: "Photographer, Traveler",
    events: [
      // Populate with UNPBaseEvent objects
    ],
  },
  ratingSummary: [
    { rating: 4, label: 'Calidad' },
    { rating: 5, label: 'Servicio' },
    { rating: 4.5, label: 'Confianza' },
    { rating: 4.8, label: 'Impacto' },
  ],
  achievements: ['Top Contributor', 'Gold Member', '500K Followers'],
  heroImages: [
    '/stock/stock (1).jpg',
    '/stock/stock (2).jpg',
    '/stock/stock (3).jpg',
    '/stock/stock (4).jpg',
    '/stock/stock (5).jpg',
    '/stock/stock (6).jpg',
    '/stock/stock (7).jpg',
    '/stock/stock (8).jpg',
    '/stock/stock (9).jpg',
  ],
  reviews: [
    {
      avatar: '/full_logo.png',
      name: 'John Doe',
      description: 'Verified Buyer',
      reviewText: 'This is the best product I have ever used!',
      rating: 4
    },
    {
      avatar: '/full_logo.png',
      name: 'Jane Smith',
      description: 'Top Reviewer',
      reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
      rating: 5
    },
    // Add more reviews as needed
  ],
};

const FundacionView: React.FC<FundacionViewProps> = ({ testData = false }) => {
  // State to hold the profile data
  const { entityId } = useParams<{ entityId: string }>();
  const [profile, setProfile] = useState<FundacionProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const entityType = "fundacion"; // Example entity type

  console.log(profile)
  useEffect(() => {
    // Async function to fetch profile data
    const fetchProfile = async () => {
      if (testData) {
        // Use hardcoded test data
        setProfile(testProfileData);
        setLoading(false);
        return;
      }

      if(entityId){
      try {
        const data = await EntityService.getEntityProfile('fundacion', entityId);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile information:", err);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    }
    };

    fetchProfile();
  }, [entityType, entityId, testData]);

  // Handle loading state
  if (loading) {
    return <UNPSpinner fullScreen label="Cargando perfil..." />;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // If profile is not available, render nothing or a fallback UI
  if (!profile) {
    return <UNPUnderConstruction  profile={profile || null} />;
  }

  // // Calculate average rating
  const averageRating =
    profile.ratingSummary.reduce((acc, curr) => acc + curr.rating, 0) /
    profile.ratingSummary.length;

  return loading ? <ProfilePlaceholder />
  : <UNPProfileLayout
      heroImages={profile.heroImages}
      entityInfo={profile.profileInfo}
      className="main-content-bottom"
    >
      {/* Additional components can be added here */}
      <UNPReviews
        reviews={profile.reviews}
        aiReview="Aqui va un review hecho por inteligencia artificial"
        averageRating={averageRating}
      />
    </UNPProfileLayout>
};

export default FundacionView;
