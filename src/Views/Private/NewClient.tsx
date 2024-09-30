import React, { useEffect, useState } from 'react';
import { Image, Container, Button, Row, Col, Form, ListGroup, ProgressBar } from 'react-bootstrap';
import FileInput from '../../Components/FileInput';
import DismissableAlert from '../../Components/DismissableAlert';

interface NewClientData {
  nombreComercial: string;
  denominacion: string;
  representante: string;
  direccion: string;
  fechaDeInicio: string;
  telefono: string;
  correoElectronico: string;
  categorias: string[];
  acercaDe: string;
  servicios: string;
}

const NewClient = () => {
  // Form data state
  const [formData, setFormData] = useState<NewClientData>({
    nombreComercial: '',
    denominacion: '',
    representante: '',
    direccion: '',
    telefono: '',
    fechaDeInicio: '',
    correoElectronico: '',
    categorias: [],
    acercaDe: '',
    servicios: '',
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photosString, setPhotosString] = useState('');

  let _categories = [
    { name: 'Category 1', icon: 'icon1' },
    { name: 'Category 2', icon: 'icon2' },
    { name: 'Category 3', icon: 'icon3' },
    { name: 'Category 4', icon: 'icon4' },
    { name: 'Category 5', icon: 'icon5' },
    { name: 'Category 6', icon: 'icon6' },
    { name: 'Category 7', icon: 'icon7' },
    { name: 'Category 8', icon: 'icon8' },
    { name: 'Category 9', icon: 'icon9' },
  ];

  function handleLogo(files: File | File[]) {
    if (!Array.isArray(files) && files.type !== 'image/png' && files.type !== 'image/jpeg') {
      setError(true);
      setLogo(null)
      return;
    }

    if (!Array.isArray(files)) {
      setLogo(files);
      console.log(files)
    }
  }

  function handlePhotos(files: File | File[]) {
    // Ensure 'files' is always treated as an array
    const fileList = Array.isArray(files) ? files : [files];

    // Check if any file is not an image
    if (fileList.some(file => file.type !== 'image/png' && file.type !== 'image/jpeg')) {
      setError(true);
      setPhotos([]);
      setPhotosString('');
      console.log("Invalid file type found.");
      return;
    }
    setPhotosString(fileList.map(file => file.name).join(', '));
    setError(false); // Reset error state if all files are valid
    setPhotos(fileList);
    console.log(fileList);
  };

  // Navigation components
  const [currentStep, setCurrentStep] = useState(1);
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goForward = () => setCurrentStep((prev) => prev + 1);

  const Navigation = () => (
    <div style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '70px',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 50px'
    }}>
      <Button className="h-75 mt-1" onClick={goBack} disabled={currentStep === 1}>
        Atras
      </Button>
      {currentStep !== 1 && (
        <>
          <ProgressBar now={(currentStep - 1) * 33.33} style={{ width: '25%' }} />
          <ProgressBar now={(currentStep * 33.33) - 100} style={{ width: '25%' }} />
          <ProgressBar now={(currentStep * 33.33) - 200} style={{ width: '25%' }} />
        </>
      )}
      <Button className="h-75 mt-1" onClick={goForward} disabled={currentStep === 30}>
        Siguiente
      </Button>
    </div>
  );

  // Autosave logic
  const [isSaving, setIsSaving] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    setIsSaving(true);
    const newTimer = setTimeout(() => {
      // Autosave logic goes here
      console.log('Autosaving data...', formData);
      setIsSaving(false);
    }, 2000);
    setTimer(newTimer);

    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  }, [formData]);

  const AutosaveIndicator = () => (
    <div>
      {isSaving ? (
        <span>Saving changes...</span> // Replace with loading icon component
      ) : (
        <span>Changes saved</span> // Replace with checkmark icon component
      )}
    </div>
  );

  return (
    <Container fluid className="new-client-main-content">
      {/* <AutosaveIndicator /> */}
      {/* {steps[currentStep - 1]} */}

      {currentStep === 1 && (<Row className="fill-height">
        <Col className="d-flex px-5 align-items-center justify-content-center " id="new-client-first-step-left" xs={5}>
          <p className="fs-1 " id="new-client-welcome-title">Ser parte de Us&Plus es muy facil</p>
        </Col>
        <Col className="mx-5 my-auto">
          <ListGroup.Item className="">
            <Row>
              <Col xs={1}>
                <p className="fs-1 secondary-text font-weight-bold">1</p>
              </Col>
              <Col>
                <p className="fs-3 new-client-welcome-content">Describe tu fundacion</p>
                <p>Llena nuestro formulario con datos basicos para conocer tu fundacion</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="py-3 my-3 border-bottom border-top">
            <Row>
              <Col xs={1}>
                <p className="fs-1 secondary-text font-weight-bold">2</p>
              </Col>
              <Col>
                <p className="fs-3 new-client-welcome-content">Describe las categorias a las que perteneces</p>
                <p>Clasifica tu fundacion en las categorias que apliquen a lo que hacen, asi sera mas facil dirigir el apoyo</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="">
            <Row>
              <Col xs={1}>
                <p className="fs-1 secondary-text font-weight-bold">3</p>
              </Col>
              <Col>
                <p className="fs-3 new-client-welcome-content">Arma y publica tu perfil</p>
                <p>Cuentanos un poco sobre tu fundacion, que objetivos tienen, a donde buscan llegar. Agrega fotos para apoyo visual, y listo!</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
      </Row>)}
      {currentStep === 2 && <Row className="fill-height">
        <Col className="d-flex px-5 align-items-center justify-content-center " xs={5}>
          <Image src="https://via.placeholder.com/400" alt="Fundacion" />
        </Col>
        <Col className="mx-5 my-auto">
          <ListGroup.Item className="">
            <Row>
              <Col xs={1}>
                <p className="fs-1 secondary-text font-weight-bold">1</p>
              </Col>
              <Col>
                <p className="fs-1 new-client-welcome-content">Describe tu fundacion</p>
                <p>Llena nuestro formulario con datos basicos para conocer tu fundacion</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
      </Row>}
      {currentStep === 3 && <Row className="fill-height">
        <Row className="pt-5 px-5">
          <Col xs={1}>
            <p className="fs-1 secondary-text font-weight-bold">1</p>
          </Col>
          <Col>
            <p className="fs-1 new-client-welcome-content">Describe tu fundacion</p>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto" xs={6}>
            <Form>
              <Form.Group className="mb-3" controlId="nombreComercial">
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control type="string" value={formData["nombreComercial"]}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    nombreComercial: e.target.value
                  }))}
                  placeholder="Nombre comercial" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="denominacion">
                <Form.Label>Denominación</Form.Label>
                <Form.Control
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    denominacion: e.target.value
                  }))}
                  type="string" placeholder="Denominación" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="representante">
                <Form.Label>Representante</Form.Label>
                <Form.Control
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    representante: e.target.value
                  }))}
                  type="string" placeholder="Nombre del representate de la fundacion" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fechaDeInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        fechaDeInicio: e.target.value
                      }))} type="date" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    direccion: e.target.value
                  }))} type="string" placeholder="Dirección" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="telefono">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        telefono: e.target.value
                      }))}  type="string" placeholder="Telefono" />
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="correoElectronico">
                    <Form.Label>Correo Electronico</Form.Label>
                    <Form.Control
                      onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        correoElectronico: e.target.value
                      }))}  type="string" placeholder="Correo Electronico" />
                  </Form.Group>

                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>}
      {currentStep === 4 && <Row className="fill-height">
        <Col className="d-flex px-5 align-items-center justify-content-center " xs={5}>
          <Image src="https://via.placeholder.com/400" alt="Fundacion" />
        </Col>
        <Col className="mx-5 my-auto">
          <Row>
            <Col xs={1}>
              <p className="fs-1 secondary-text font-weight-bold">2</p>
            </Col>
            <Col>
              <p className="fs-1 new-client-welcome-content">Describe las categorias a las que perteneces</p>
              <p>Clasifica tu fundacion en las categorias que apliquen a lo que hacen, asi sera mas facil dirigir el apoyo</p>
            </Col>
          </Row>
        </Col>
      </Row>}
      {currentStep === 5 && <Row className="justify-content-center">
        <Row className="py-5 px-5">
          <Col xs={1} className="">
            <p className="fs-1 secondary-text font-weight-bold">2</p>
          </Col>
          <Col className="">
            <p className="fs-1 new-client-welcome-content">Descubre tus categorias</p>
          </Col>
        </Row>
        <Row className="mx-auto justify-content-center">
          {_categories.map((category, index) => (
            <Col
              key={index}
              className="m-2"
              xs={12} sm={6} md={4} lg={3}>
              <Button
                style={{ height: 125, width: '100%' }} // Adjust width to '100%' for full column width
                variant="outline-primary"
                onClick={() => console.log('Category selected:', category)}>
                <i className="bi bi-person fs-1"></i>
                <p>{category.name}</p>
              </Button>
            </Col>
          ))}
        </Row>
      </Row>}
      {currentStep === 6 && <Row className="fill-height">
        <Col className="d-flex px-5 align-items-center justify-content-center " xs={5}>
          <Image src="https://via.placeholder.com/400" alt="Fundacion" />
        </Col>
        <Col className="mx-5 my-auto">
          <ListGroup.Item className="">
            <Row>
              <Col xs={1}>
                <p className="fs-1 secondary-text font-weight-bold">3</p>
              </Col>
              <Col>
                <p className="fs-1 new-client-welcome-content">Arma y publica tu perfil</p>
                <p>Cuentanos un poco sobre tu fundacion, que objetivos tienen, a donde buscan llegar. Agrega fotos para apoyo visual, y listo!</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
      </Row>}
      {currentStep === 7 && <Row className="justify-content-center">
        <Row className="py-5 px-5">
          <Col xs={1} className="">
            <p className="fs-1 secondary-text font-weight-bold">3</p>
          </Col>
          <Col className="">
            <p className="fs-1 new-client-welcome-content">Arma tu perfil</p>
          </Col>
        </Row>
        <Row className="mx-auto justify-content-center">
          <Col className="mx-auto" xs={6}>
            <Form>
              <Form.Group className="mb-3" controlId="logo">
                <Form.Label>Logotipo de tu Fundacion</Form.Label>
                <FileInput
                  acceptedValues='image/png, image/jpg'
                  onFileSelect={handleLogo}
                  name={logo?.name} />
                {error && <DismissableAlert setShow={setError} show={error} title="Error" description="Solo se aceptan archivos .png y .jpg" />}
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="denominacion">
                <Form.Label>Cuentanos a cerca de tu fundacion</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="denominacion">
                <Form.Label>Que servicios ofrecen en tu fundacion?</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Row>}
      {currentStep === 8 && <Row className="justify-content-center">
        <Row className="py-5 px-5">
          <Col xs={1} className="">
            <p className="fs-1 secondary-text font-weight-bold">2</p>
          </Col>
          <Col className="">
            <p className="fs-1 new-client-welcome-content">Descubre tus categorias</p>
          </Col>
        </Row>
        <Row className="mx-auto justify-content-center">

          <Form.Group className="mb-3" controlId="logo">
            <p>Comparte fotos sobre el trabajo de tu fundacion para que los usuarios puedan ver de que se tratan los labores que hacen</p>
            {/* <Form.Label></Form.Label> */}
            <FileInput
              multiple
              acceptedValues='image/png, image/jpg'
              onFileSelect={handlePhotos}
              name={photosString} />
            {error && <DismissableAlert setShow={setError} show={error} title="Error" description="Solo se aceptan archivos .png y .jpg" />}
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </Form.Group>
        </Row>
      </Row>}
      {currentStep === 9 && <Row className="justify-content-center">
        <Row className="py-5 px-5">
          <Col xs={1} className="">
            <p className="fs-1 secondary-text font-weight-bold">4</p>
          </Col>
          <Col className="">
            <p className="fs-1 new-client-welcome-content">Revisa tu informacion</p>
          </Col>
        </Row>
        <Row className="mx-auto justify-content-center">
          <Form.Group className="mb-3" controlId="formData">
            <ListGroup>
              {Object.entries(formData).map(([key, value]) => (
                <ListGroup.Item key={key} disabled>
                  <Row>
                    <Col xs={4}>
                      <p className="font-weight-bold">{key}</p>
                    </Col>
                    <Col>
                      <p>{value}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>

        </Row>
      </Row>}
      <Navigation />
    </Container>
  );
};

export default NewClient;