import UNPProfileLayout from "../../Components/unp/UNPProfileLayout";


const FundraiserView = () => {
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
    aboutUs: 'aaha',
    services: ['Ayudamos a niños','Ayudamos a niños','Ayudamos a niños','Ayudamos a niños','Ayudamos a niños','Ayudamos a niños','Ayudamos a niños','Ayudamos a niños',]
  };

  return (
    <></>
    // <UNPProfileLayout heroImages={heroImages} entityInfo={entityInfo}>
    //   {/* Additional components can be added here */}
    // </UNPProfileLayout>
  );
};

export default FundraiserView;
