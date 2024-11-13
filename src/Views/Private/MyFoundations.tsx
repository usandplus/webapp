import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import UNPShowcaseGrid, { UNPShowcaseGridProps } from '../../Components/unp/UNPShowcaseGrid';
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';
import { Col, Row } from 'react-bootstrap';

export default function MyFoundations() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, clientId } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<UNPBaseCategory | null>(null);
  const [items, setItems] = useState<UNPShowcaseGridProps['items']>([]);

  useEffect(() => {
    const baseTypes: UNPBaseType[] = ['organizacion', 'convocatoria', 'campana', 'empresa'];
    const categoryTypes: UNPBaseCategory[] = [
      'educacion',
      'ciencia',
      'deporte',
      'salud',
      'medio ambiente',
      'arte',
      'tecnologia',
      'negocio',
    ];

    const generateDummyData = () => {
      let dummyData: {}[] = []
      const fdata = Array.from({ length: 2 }, (_, index) => ({
        id: `${index + 1}`,
        title: `Sample Title`,
        description: 'This is a sample description.',
        imgURL: '/full_logo.png', // Placeholder image
        rating: 4.5, // Fixed rating
        category: categoryTypes[Math.floor(Math.random() * categoryTypes.length)] as UNPBaseCategory, // Random category
        clientId: `${index + 1}`,
        number: Math.ceil(Math.random() * 500), // Fixed number of volunteers
        numberTitle: 'Volunteers',
        profileImgURL: '/full_logo.png', // Placeholder avatar
        baseType: 'campana' as UNPBaseType, // Random baseType
      }));
      const edata = Array.from({ length: 1 }, (_, index) => ({
        id: `${index + 1}`,
        title: `Sample Title`,
        description: 'This is a sample description.',
        imgURL: '/full_logo.png', // Placeholder image
        rating: 4.5, // Fixed rating
        category: categoryTypes[Math.floor(Math.random() * categoryTypes.length)] as UNPBaseCategory, // Random category
        clientId: `${index + 1}`,
        number: Math.ceil(Math.random() * 500), // Fixed number of volunteers
        numberTitle: 'Volunteers',
        profileImgURL: '/full_logo.png', // Placeholder avatar
        baseType: 'organizacion' as UNPBaseType, // Random baseType
      }));

      dummyData = dummyData.concat(...fdata, ...edata)
      return dummyData;
    };

    // Set the items to the generated dummy data
    setItems(generateDummyData());
  }, []);

  // Function to filter items based on baseType
  const getFilteredItemsByBaseType = (baseType: UNPBaseType) => {
    return items.filter((item: any) => item.baseType === baseType);
  };

  return (
    <div className="p-0 p-md-3">
      <h1 className="mt-3">Bienvenido, Comotellames</h1>
      <Row >
        <Col/>
        <Col xs={10} >
        {getFilteredItemsByBaseType('organizacion').length > 0 && (
          <UNPShowcaseGrid
            mini
            customNavigationPrefix='admin'
            simple
            selectedCategory={selectedCategory}
            title="Recientes"
            items={getFilteredItemsByBaseType('organizacion')}
            baseType="organizacion"
          />
        )}
        </Col>
        <Col/>
      </Row>

      {getFilteredItemsByBaseType('campana').length > 0 && (
        <UNPShowcaseGrid
          customNavigationPrefix='admin'
          simple
          selectedCategory={selectedCategory}
          title="Tus Campañas"
          items={getFilteredItemsByBaseType('campana')}
          baseType="campana"
        />
      )}

      {getFilteredItemsByBaseType('empresa').length > 0 && (
        <UNPShowcaseGrid
          customNavigationPrefix='admin'
          simple
          selectedCategory={selectedCategory}
          title="Tus Empresas"
          items={getFilteredItemsByBaseType('empresa')}
          baseType="empresa"
        />
      )}

      {getFilteredItemsByBaseType('convocatoria').length > 0 && (
        <UNPShowcaseGrid
          customNavigationPrefix='admin'
          simple
          selectedCategory={selectedCategory}
          title="Tus Convocatorias"
          items={getFilteredItemsByBaseType('convocatoria')}
          baseType="convocatoria"
        />
      )}
    </div>
  );
}
