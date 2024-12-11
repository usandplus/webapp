import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, ButtonGroup } from 'react-bootstrap';
import UNPFilterBar from '../../Components/unp/UNPFilterBar';
import UNPShowcaseGrid, { UNPShowcaseGridProps } from '../../Components/unp/UNPShowcaseGrid';
import UNPButton from '../../Components/unp/UNPButton';
import UNPSearchBar from '../../Components/unp/UNPSearchBar';
import { UNPBaseCategory, UNPBaseType } from '../../types/models/common';

export default function Home() {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UNPBaseCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<UNPShowcaseGridProps['items']>([]);
  const [selectedType, setSelectedType] = useState<UNPBaseType | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFilterChange = (category: UNPBaseCategory | null) => setSelectedCategory(category);
  const handleTypeChange = (type: UNPBaseType | null) => setSelectedType(type);
  const handleSearchChange = (query: string) => setSearchQuery(query);

  useEffect(() => {
    // Add scroll listener to add shadow to bars once scrolled
    const handleScroll = () => {
      const searchBarContainer = document.querySelector('.search-bar-container');
      const filterBarContainer = document.querySelector('.filter-bar-container');
      const homeScrollContainer = document.querySelector('.homeScroll');
      if (window.scrollY > 0) {
        searchBarContainer?.classList.add('scrolled');
        filterBarContainer?.classList.add('scrolled');
        homeScrollContainer?.classList.add('scrolled');
      } else {
        searchBarContainer?.classList.remove('scrolled');
        filterBarContainer?.classList.remove('scrolled');
        homeScrollContainer?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
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
    const fakeUrls = [
      '/stock/stock (1).jpg',
      '/stock/stock (2).jpg',
      '/stock/stock (3).jpg',
      '/stock/stock (4).jpg',
      '/stock/stock (5).jpg',
      '/stock/stock (6).jpg',
      '/stock/stock (7).jpg',
      '/stock/stock (8).jpg',
      '/stock/stock (9).jpg',
    ];
    const generateDummyData = () =>
      Array.from({ length: 50 }, (_, index) => ({
        id: `${index + 1}`,
        title: `Sample Title ${index + 1}`,
        description: 'This is a sample description.',
        imgURL: fakeUrls[Math.floor(Math.random() * fakeUrls.length)],
        rating: (Math.random()*1.5 + 3.5).toFixed(2),
        category: categoryTypes[Math.floor(Math.random() * categoryTypes.length)],
        clientId: `${index + 1}`,
        number: Math.ceil(Math.random() * 500),
        numberTitle: 'Volunteers',
        profileImgURL: fakeUrls[Math.floor(Math.random() * fakeUrls.length)],
        baseType: 'fundacion'
        // baseType: ['fundacion', 'campana', 'empresa', 'convocatoria'][
        //   Math.floor(Math.random() * 4)
        // ] as UNPBaseType,
      }));
    setItems(generateDummyData());
  }, []);

  // Apply both filters: search and type
  const filteredItems = items.filter(item => {
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.baseType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Container className="main-content ">
      {/* Modal for Advanced Filters */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Encuentra tu fundación favorita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="rangeInput">Distancia</label>
              <input type="range" className="form-control" id="rangeInput" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="checkInput">Donataria Autorizada</label>
              <input type="checkbox" className="form-check-input" id="checkInput" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="selectInput">Estado</label>
              <select className="form-control" id="selectInput">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <UNPButton variant="secondary" onClick={handleClose}>
            Close
          </UNPButton>
          <UNPButton variant="primary" onClick={handleClose}>
            Save Changes
          </UNPButton>
        </Modal.Footer>
      </Modal>

      {/* Entity Switch */}
      {/* <Container fluid className="entity-switch-container d-none d-md-flex bg-transparent">
        <Row className="justify-content-center">
          <Col xs={12} md={12}>
            <ButtonGroup size="sm" className="mb-2">
              <UNPButton
                onClick={() => handleTypeChange('fundacion')}
                variant={selectedType === 'fundacion' ? 'outline-primary' : 'outline-light'}
              >
                Fundaciones
              </UNPButton>
              <UNPButton
                onClick={() => handleTypeChange('campana')}
                variant={selectedType === 'campana' ? 'outline-primary' : 'outline-light'}
              >
                Campañas
              </UNPButton>
              <UNPButton
                onClick={() => handleTypeChange('empresa')}
                variant={selectedType === 'empresa' ? 'outline-primary' : 'outline-light'}
              >
                Empresas
              </UNPButton>
              <UNPButton
                onClick={() => handleTypeChange('convocatoria')}
                variant={selectedType === 'convocatoria' ? 'outline-primary' : 'outline-light'}
              >
                Convocatoria
              </UNPButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Container> */}

      {/* Search Bar */}
      <Container className="search-bar-container bg-white">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <UNPSearchBar onSearch={handleSearchChange} />
          </Col>
        </Row>
      </Container>

      {/* Filter Bar */}
      <Container className="filter-bar-container bg-white pt-0 mb-3">
        <Row className="align-items-center flex-nowrap">
          <Col xs={12} md={10}>
            <UNPFilterBar onFilterChange={handleFilterChange} selectedCategory={selectedCategory} />
          </Col>
          <Col md={2} className="d-none d-md-block">
            <UNPButton onClick={handleShow}>Filtros</UNPButton>
          </Col>
        </Row>
      </Container>

      {/* Showcase Grid */}
      <Container fluid className="unp-showcase-grid-container px-lg-5">
        <UNPShowcaseGrid
          selectedCategory={selectedCategory}
          title=""
          items={filteredItems}
          baseType={selectedType}
        />
      </Container>
    </Container>
  );
}
