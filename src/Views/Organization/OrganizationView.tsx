import UNPProfileLayout from "../../Components/unp/UNPProfileLayout";
import UNPReviews from "../../Components/unp/UNPReviews";


const OrganizationView = () => {
  const heroImages = [
    '/wordmark.png',
    '/full_logo.png',
    '/wordmark.png',
    '/full_logo.png',
    '/logo512.png',
    // Add more images as needed
  ];

  const entityInfo = {
    logo: "/full_logo.png",
    categories: "Photographer, Traveler",
    location: "San Pedro Garza Garcia",
    achievements: ['Top Contributor', 'Gold Member', '500K Followers'],
    name: 'Us & Plus',
    description: 'Una fundación es una organización privada sin fines de lucro que se caracteriza por perseguir objetivos de interés general para un grupo de beneficiarios. Se crea por la voluntad de una o varias personas, que destinan un patrimonio para la realización de sus fines. ',
    history: 'A detailed history of the entity.',
    ratingSummary: [
      { 'rating1': 4 },
      { 'rating2': 4 },
      { 'rating3': 4 },
      { 'rating4': 4 },
    ],
    founders: [
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder1', name: 'Founder Uno', avatarURL: '/full_logo.png' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder2', name: 'Founder Dos', avatarURL: '/full_logo.png' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder3', name: 'Founder Tres', avatarURL: '/full_logo.png' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder4', name: 'Founder Cuatro', avatarURL: '/full_logo.png' }
    ],
    campaigns: [
      { url: '/campana/1', name: 'Campaña Uno', avatarURL: '/full_logo.png' },
      { url: '/campana/2', name: 'Campaña Dos', avatarURL: '/full_logo.png' },
      { url: '/campana/3', name: 'Campaña Tres', avatarURL: '/full_logo.png' },
      { url: '/campana/4', name: 'Campaña Cuatro', avatarURL: '/full_logo.png' }
    ],
    aboutUs: 'EmpowerChange Foundation is a nonprofit organization dedicated to creating opportunities for underserved communities worldwide. Through education, healthcare initiatives, and sustainable development programs, we aim to break cycles of poverty and empower individuals to thrive. Our team collaborates with local leaders and volunteers to deliver impactful solutions tailored to specific needs. By fostering resilience, equity, and innovation, EmpowerChange is building a brighter future for everyone. Join us in making a lasting difference, one community at a time. Together, we transform lives!',
    services: ['Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños', 'Ayudamos a niños',]
  };
  const reviews = [
    {
      avatar: '/full_logo.png',
      name: 'John Doe',
      description: 'Verified Buyer',
      reviewText: 'This is the best product I have ever used!',
    },
    {
      avatar: '/full_logo.png',
      name: 'Jane Smith',
      description: 'Top Reviewer',
      reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
    },
    {
      avatar: '/full_logo.png',
      name: 'Jane Smith',
      description: 'Top Reviewer',
      reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
    },
    {
      avatar: '/full_logo.png',
      name: 'Jane Smith',
      description: 'Top Reviewer',
      reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
    },
    {
      avatar: '/full_logo.png',
      name: 'Jane Smith',
      description: 'Top Reviewer',
      reviewText: 'Absolutely fantastic! Highly recommend to everyone.',
    },
  ];
  return (
    <UNPProfileLayout heroImages={heroImages} entityInfo={entityInfo}>
      {/* Additional components can be added here */}
      <UNPReviews reviews={reviews} aiReview='Aqui va un review hecho por inteligencia artificial' averageRating={4.3} />
    </UNPProfileLayout>
  );
};

export default OrganizationView;
