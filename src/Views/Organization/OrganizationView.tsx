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
    name: 'Us & Plus',
    description: 'This is a brief description of the entity.',
    history: 'A detailed history of the entity.',
    locationAddress: '1234 Street Name, City, Country',
    logo: './full_logo.png',
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
