import UNPProfileLayout from "../../Components/unp/UNPProfileLayout";
import UNPReviews from "../../Components/unp/UNPReviews";


const OrganizationView = () => {
  const heroImages = [
    '/stock/stock (1).jpg',
    '/stock/stock (2).jpg',
    '/stock/stock (3).jpg',
    '/stock/stock (4).jpg',
    '/stock/stock (5).jpg',
    '/stock/stock (6).jpg',
    '/stock/stock (7).jpg',
    '/stock/stock (8).jpg',
    '/stock/stock (9).jpg',
  ]

  const entityInfo = {
    logo: "/stock/stock (3).jpg",
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
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder1', name: 'Founder Uno', avatarURL: '/stock/stock (7).jpg' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder2', name: 'Founder Dos', avatarURL: '/stock/stock (6).jpg' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder3', name: 'Founder Tres', avatarURL: '/stock/stock (4).jpg' },
      { description: 'ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ahuevo el mejor founder del mundo wuwuw ', id: 'founder4', name: 'Founder Cuatro', avatarURL: '/stock/stock (5).jpg' }
    ],
    campaigns: [
      { url: '/campana/1', name: 'Campaña Uno', avatarURL: '/stock/stock (4).jpg' },
      { url: '/campana/2', name: 'Campaña Dos', avatarURL: '/stock/stock (3).jpg' },
      { url: '/campana/3', name: 'Campaña Tres', avatarURL: '/stock/stock (2).jpg' },
      { url: '/campana/4', name: 'Campaña Cuatro', avatarURL: '/stock/stock (1).jpg' }
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
    <UNPProfileLayout heroImages={heroImages} entityInfo={entityInfo} className='main-content-bottom'>
      {/* Additional components can be added here */}
      <UNPReviews reviews={reviews} aiReview='Aqui va un review hecho por inteligencia artificial' averageRating={4.3} />
    </UNPProfileLayout>
  );
};

export default OrganizationView;
