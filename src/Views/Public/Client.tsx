import { Badge, ListGroup, ProgressBar, CloseButton, Button, Col, Card, Container, Image, Row, Modal } from 'react-bootstrap';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Footer from './../../Components/Footer'
import GoogleMaps from './../../Components/GoogleMaps'
import StarRatings from './../../Components/StarRatings'
import UNPButton from '../../Components/unp/UNPButton';
export interface ClientProps {
  amount_reviews?: number;
  campaigns?: Array<{ id: number, title: string, description: string, src: string }>;
  description?: string;
  details?: string;
  email?: string;
  featuresAll?: Array<{ icon: string, title: string, description: string }>;
  featuresMain?: Array<{ icon: string, title: string, description: string }>;
  founders?: Array<{ name: string, description: string, src: string }>;
  image?: { src: string, alt: string };
  label?: string;
  locationAddress?: string;
  location?: Array<{ lat: number, lng: number, description: string }>;
  logo?: { alt: string, src: string };
  metrics?: Array<{ id: number, rating: number }>;
  name?: string;
  ratings?: Array<{
    mainRating: number,
    rating_percentages: Array<{
      5: number,
      4: number,
      3: number,
      2: number,
      1: number
    }>
  }>;
  reasons?: Array<string>;
  reviews?: Array<{
    category: string,
    date: string,
    locationName: string,
    name: string,
    rating: number,
    src: string,
    text: string
  }>;
  shortDescription?: string;
  stats?: Array<{ icon: string, description: string }>;
  stripeURL?: string;
}

const Client: FC<ClientProps> = ({
  amount_reviews,
  campaigns,
  description,
  details,
  featuresAll,
  featuresMain,
  founders,
  image,
  label,
  locationAddress,
  location,
  logo,
  metrics,
  name,
  ratings,
  reasons,
  reviews,
  shortDescription,
  stats,
  stripeURL
}) => {
  const navigate = useNavigate()
  const { category, clientId } = useParams()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  let _amount_reviews = amount_reviews || '125'
  let _campaigns = campaigns || [{
    id: 1,
    title: 'Campaign',
    description: 'Campaign description',
    src: '/full_logo.png'
  }, {
    id: 2,
    title: 'Campaign',
    description: 'Campaign description',
    src: '/full_logo.png'
  }, {
    id: 3,
    title: 'Campaign',
    description: 'Campaign description',
    src: '/full_logo.png'
  }, {
    id: 4,
    title: 'Campaign',
    description: 'Campaign description',
    src: '/full_logo.png'
  }]
  let _description = description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue purus, efficitur a vehicula non, vehicula ac nibh. In hac habitasse platea dictumst. Fusce ultricies, nibh ut imperdiet facilisis, lacus sapien'
  let _details = details || 'details variable'
  let _featuresAll = featuresAll || [{
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }, {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'All feature',
    description: 'All feature description'
  }]
  let _featuresMain = featuresMain || [{
    icon: 'fa-solid fa-user',
    title: 'Main feature',
    description: 'Main feature description lorem ipsum'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'Main feature',
    description: 'Main feature description lorem ipsum'
  },
  {
    icon: 'fa-solid fa-user',
    title: 'Main feature',
    description: 'Main feature description lorem ipsum'
  }]
  let _image = image || {
    src: '/full_logo.png',
    alt: 'Us&Plus Logo'
  }
  let _label = label || 'Ayudamos a ayudar'
  let _locationAddress = locationAddress || 'San Pedro Garza Garcia, Mexico'
  let _location = location || { lat: 0, lng: 0, description: 'test' }
  let _logo = logo || { src: '/full_logo.png', alt: 'Us&Plus Logo' }
  let _metrics = metrics || [
    {
      id: 1,
      rating: 4.3
    },
    {
      id: 2,
      rating: 5.0
    },
    {
      id: 3,
      rating: 4.1
    },
    {
      id: 4,
      rating: 4.8
    },
    {
      id: 5,
      rating: 4.7
    },
    {
      id: 6,
      rating: 4.1
    }
  ]
  let _name = name || 'Us & Plus'
  let _ratings = ratings || {
    mainRating: 4.5,
    rating_percentages: [{
      5: 87,
      4: 12,
      3: 2,
      2: 1,
      1: 0
    }]
  }
  let _reasons = reasons || ['reason1', 'reason2', 'reason3', 'reason4', 'reason5']
  let _reviews = reviews || [{
    name: 'Samuel Fematt',
    date: '10/09/2023',
    locationName: 'San Pedro Garza Garcia, Mexico',
    category: 'Suscriptor',
    src: '/full_logo.png',
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nibh. Aliquam erat volutpat. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi'
  }, {
    name: 'Samuel Fematt',
    date: '10/09/2023',
    locationName: 'San Pedro Garza Garcia, Mexico',
    category: 'Suscriptor',
    src: '/full_logo.png',
    rating: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nibh. Aliquam erat volutpat. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi'
  }, {
    name: 'Samuel Fematt',
    date: '10/09/2023',
    locationName: 'San Pedro Garza Garcia, Mexico',
    category: 'Suscriptor',
    src: '/full_logo.png',
    rating: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nibh. Aliquam erat volutpat. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi'
  }, {
    name: 'Samuel Fematt',
    date: '10/09/2023',
    locationName: 'San Pedro Garza Garcia, Mexico',
    category: 'Suscriptor',
    src: '/full_logo.png',
    rating: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nibh. Aliquam erat volutpat. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi scelerisque luctus velit. Nulla quis velit. Morbi'
    }]
  let _stats = stats || [
    {
      icon: 'bi bi-star',
      description: 'this is a description about a stat'
    },
    {
      icon: 'bi bi-person',
      description: 'this is a description about a stat'
    },
  ]
  let _shortDescription = shortDescription || 'This is a short description about this stuff'
  let _stripeURL = stripeURL || ''
  let _founders = founders || [
    {
      name: 'Samuel Fematt',
      description: 'this is a description about a founder',
      src: '/full_logo_no_phrase.png'
    },
    {
      name: 'Samuel Fematt',
      description: 'this is a description about a founder',
      src: '/full_logo_no_phrase.png'
    }
  ]
  return (
    <>
      {/* desktop version */}
      <Container fluid className="m-0 p-0 px-5 d-none d-md-block">
        {/* names */}
        <Row className="d-none d-md-flex">
          <Col xs={10}>
            <h1>{_label}</h1>
          </Col>
        </Row>
        {/* photos */}
        {/* post picture 2 columns */}
        <Row className="pt-4">
          {/* first column */}
          <Col xs={8}>
            <Row className="">
              <Col>
                <Image
                  fluid
                  style={{ borderRadius: 20, maxHeight: 500}}
                  alt={_image.alt}
                  src={_image.src} />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Image
                  width="100%"
                  src={_logo.src}
                  rounded
                />
              </Col>
              <Col className="d-flex flex-column  align-items-left justify-content-center">
                <Row><p className="fs-2 mb-0">{_name}</p></Row>
                <Row><p className="fs-5">{_locationAddress}</p></Row>
              </Col>
            </Row>
            <Row className="mb-2 mt-3">
              <Badge style={{ marginLeft: 25, width: 50, borderRadius: 15 }} >test</Badge>
            </Row>
            {/* description */}
            <Row className="pt-3 pb-3 border-top ">
              <p className="fs-3 client-title">Sobre {_name}</p>
              <Row>
                <p>{_description}</p>
              </Row>
            </Row>
            {/* Features */}
            <Row className="pt-3 pb-3 border-top">
              <p className="fs-3 client-title">Lo que ofrece esta fundación</p>
              {
                _featuresMain.map((feature, index) => {
                  return index < 4
                    ? <Row className="d-flex flex-col ml-5">
                      <Col xs={1}>
                        <i className={`fa-2xl ${feature.icon}`}></i>
                      </Col>
                      <Col>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </Col>
                    </Row>
                    : <></>
                })
              }
            </Row>
            {/* founders */}
            <Row className="pt-3 pb-3 border-top">
              <Row className="mb-5">
                <p className="fs-3 client-title">Fundadores</p>
              </Row>
              <Row className="d-flex flex-col ml-5  justify-content-around">
                {
                  _founders.map((founder, index) =>
                    <Col xs={5} className="mb-4">
                      <Row>
                        <Image src='/full_logo_no_phrase.png' className="mr-2" />
                      </Row>
                      <Row>
                        <Row><p className="text-center client-title fs-4">{founder.name}</p></Row>
                        <Row><p>{founder.description}</p></Row>
                      </Row>
                    </Col>

                  )
                }
              </Row>
            </Row>
            {/* campaigns */}
            <Row className="pt-3 pb-3 border-top">
              <Row className="mb-5">
                <p className="fs-3 client-title">Campañas</p>
              </Row>
              <Row className="d-flex flex-col ml-5  justify-content-around">
                {
                  _campaigns.map((campaign, index) =>
                    <Col xs={5} className="mb-4">
                      <Row>
                        <Image src='/full_logo_no_phrase.png' className="mr-2" />
                      </Row>
                      <Row>
                        <Row><p className="text-center client-title fs-4">{campaign.title}</p></Row>
                        <Row><p>{campaign.description}</p></Row>
                      </Row>
                    </Col>

                  )
                }
              </Row>
            </Row>
          </Col>
          {/* second column - subscription card */}
          <Col className="ml-5 ">
            <Card id="subscriptionCard" className="shadow-lg">
              <Card.Body>
                <Row className="border-bottom pb-3 subscription-title">
                  <p className="fs-3 mb-0">Dona Ahora</p>
                  <small>Us & Plus no recibe dinero de tus donaciones</small>
                </Row>
                <Row className="pt-3 ">
                  <Col xs={2} className="subscription-client-title">
                    <Image
                      style={{ borderRadius: 20, width: 50 }}
                      alt={_image.alt}
                      src={_image.src} fluid />
                  </Col>
                  <Col  className="subscription-client-title">
                    <h3>{_name}</h3>
                  </Col>
                </Row>
                <Row><small>{_description}</small></Row>
                <Row className="p-3">
                  <ListGroup id="reasonSubscriptionCard">
                    {_stats.map((stat, index) => {
                      return <ListGroup.Item key={index}><i className={stat.icon}> </i>{stat.description}</ListGroup.Item>
                    })}
                  </ListGroup>
                </Row>
              </Card.Body>
              <UNPButton
                className="w-75 mx-auto mb-3"
                variant="secondary"
                href="https://donate.stripe.com/bIYcOh94K8US6v6dQR"
                target="_blank">
                Donar Ahora
              </UNPButton>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 pt-3 border-top">
          {/* rating | # reviews*/}
          <Row>
            <h4 className="font-weight-bold"><StarRatings single /> {Array.isArray(_ratings) ? _ratings[0].mainRating : _ratings.mainRating} · {_amount_reviews} calificaciones </h4>
          </Row>
          {/* overall scores 7 cols*/}
          <Row className="pt-4">
            <Col xs={2} className="border-right pr-0">
              <Row>
                <h6>Calificación</h6>
              </Row>
              <Row className="d-flex flex-nowrap align-items-center left">
                <Col xs={1}><small>5</small></Col>
                <Col>
                  <ProgressBar className="rating_bar " now={75} />
                </Col>
              </Row>

              <Row className="d-flex flex-nowrap align-items-center left">
                <Col xs={1}><small>4</small></Col>
                <Col>
                  <ProgressBar className="rating_bar " now={75} />
                </Col>
              </Row>

              <Row className="d-flex flex-nowrap align-items-center left">
                <Col xs={1}><small>3</small></Col>
                <Col>
                  <ProgressBar className="rating_bar " now={75} />
                </Col>
              </Row>

              <Row className="d-flex flex-nowrap align-items-center left">
                <Col xs={1}><small>2</small></Col>
                <Col>
                  <ProgressBar className="rating_bar " now={75} />
                </Col>
              </Row>

              <Row className="d-flex flex-nowrap align-items-center left">
                <Col xs={1}><small>1</small></Col>
                <Col>
                  <ProgressBar className="rating_bar " now={75} />
                </Col>
              </Row>

            </Col>
            {_metrics.map((metric, index) => {
              return index < 5 ?
                <Col xs={2} className={`${index === 4 ? '' : 'border-right'} px-3 d-flex flex-column align-items-start`}>
                  <Row >
                    <h6>Metrica {index + 1}</h6>
                    <h6>{metric.rating}</h6>
                  </Row>
                  <Row>
                    <Image src='/full_logo_no_phrase.png' className="mr-2" />
                  </Row>
                </Col>
                : <></>
            })}

          </Row>
          {/* reviews*/}
          <Row className="py-5 my-5 border-bottom border-top d-flex justify-content-around align-items-center">
            {
              _reviews.map((review, index) => {
                return index < 5
                  ? <Col className="client-review " xs={5}>
                    <Row>
                      <Col
                        md={4}
                        className="review-picture d-flex align-items-center justify-content-center"
                      >
                        <Image
                          roundedCircle
                          src={review.src}
                        />
                      </Col>
                      <Col>
                        <Row><h5>{review.name}</h5></Row>
                        <Row><small>{review.locationName}</small></Row>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <div ><StarRatings rating={review.rating} />· hace 2 días · <small>Suscriptor</small></div>
                    </Row>
                    <Row>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue purus, efficitur a vehicula non, vehicula ac nibh. In hac habitasse platea dictumst. Fusce ultricies, nibh ut imperdiet facilisis, lacus sapien maximus justo, non condimentum erat leo vitae metus. </p>
                    </Row>
                  </Col>
                  : <></>
              })
            }
            {/* Button */}
            < Row className="pt-3" >
              <Col xs={4}>
                <UNPButton variant='primary' onClick={handleShow}>
                  Ver todas las calificaciones
                </UNPButton>
              </Col>
            </Row>
          </Row>
        </Row>

        {/* google map */}
        <Row>
          <Row><h4>Ubicación</h4></Row>
          <Row className="pt-4">
            <GoogleMaps locations={Array.isArray(_location) ? _location : [_location]} />
          </Row>
        </Row>
      </Container >
      {/* mobile version */}
      < div >
        {/* pictures */}
        <Col xs={12} className="d-flex d-md-none">
          <CloseButton
            className='close-button'
            onClick={() => navigate(`/fundaciones/${category}`)}
          />
          <Image
            src={'/full_logo.png'}
            fluid
          />
        </Col>
        {/* main */}
        <Container className="d-md-none">
          {/* header */}
          <Row>
            <Col xs={10}>
              <h1>{_name}</h1>
              <Row>
                <p className="bold">
                  <span className="font-weight-bold">
                    <StarRatings single />
                    {Array.isArray(_ratings) ? _ratings[0].mainRating : _ratings.mainRating}</span>
                  · {_label} ·
                  <span className="text-decoration-underline">{_locationAddress}</span>
                </p>
              </Row>
            </Col>
            <Col className="d-flex align-items-end pb-3" >
              <Row>
                <Col>
                  <div className="text-decoration-underline">Share</div>
                </Col>
                <Col>
                  <div className="text-decoration-underline">Save</div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* info */}
          <Row className="pt-4 border-top">
            <Col>
              <Row>
                <Col xs={3}>
                  <Image
                    width="100%"
                    src={_logo.src}
                  />
                </Col>
                <Col className="d-flex flex-column  align-items-left justify-content-center">
                  <Row><h2>{_name} </h2></Row>
                  <Row><h4>{_label}</h4></Row>
                  <Row><p>{_shortDescription}</p></Row>
                </Col>
              </Row>
              {/* Features */}
              <Row className="mt-3 pt-3 pb-3 border-top">
                {
                  _featuresMain.map((feature, index) => {
                    return index < 4
                      ? <Row className="d-flex flex-col ml-5">
                        <Col xs={1}>
                          <i className={`fa-2xl ${feature.icon}`}></i>
                        </Col>
                        <Col>
                          <h4>{feature.title}</h4>
                          <p>{feature.description}</p>
                        </Col>
                      </Row>
                      : <></>
                  })
                }
              </Row>
            </Col>
          </Row>

          {/* description */}
          <Row className="pt-3 pb-3 border-top ">
            <Row>
              <p>{_description}</p>
            </Row>
          </Row>
          {/* what offers */}
          <Row className="pt-3 pb-3 border-top">
            <Row className="mb-5">
              <h4>Lo que ofrece esta fundación</h4>
            </Row>
            <Row className="d-flex flex-col ml-5  justify-content-around">
              {
                _featuresAll.map((feature, index) => {
                  return index < 6
                    ? <Col xs={5} className="mb-4">
                      <Row>
                        <Col xs={3}>
                          <i className={`fa-2xl ${feature.icon}`}></i>
                        </Col>
                        <Col className="d-flex align-items-center">
                          <p>{feature.title}</p>
                        </Col>
                      </Row>
                    </Col>
                    : <></>
                })
              }
            </Row>

            {/* Button */}
            <Row className="pt-3">
              <Col xs={4}>
                <UNPButton variant='primary' onClick={handleShow}>
                  Ver todas ({_featuresAll.length})
                </UNPButton>
              </Col>
            </Row>
          </Row>

          {/* google map */}
          <Row className="pt-3 pb-3 border-top">
            <Row><h4>Ubicación</h4></Row>
            <Row className="pt-4">
              <GoogleMaps locations={[]} />
            </Row>
          </Row>
          {/* rating | # reviews*/}
          <Row className="pt-3 pb-3 border-top">
            <Row>
              <h4 className="font-weight-bold"><StarRatings single /> {Array.isArray(_ratings) ? _ratings[0].mainRating : _ratings.mainRating} · {_amount_reviews} calificaciones </h4>
            </Row>
            <Row className="mt-4 horizontal-scrollable">
              {_reviews.map((review, index) => {
                return <Card>
                  <Card.Body>
                    <Row>
                      <p>
                        <StarRatings
                          rating={review.rating}
                        /> · {review.date}
                      </p>
                    </Row>
                    <Row>{review.text}</Row>
                    <Container className="w-100 mt-3" id="mobile-reviews">
                      <Row className="flex-nowrap">
                        <Col xs={3} className=" review-picture-mobile">
                          <Image
                            roundedCircle
                            src={review.src}
                          />
                        </Col>
                        <Col className="align-self-center">
                          <h5>{review.name}</h5>
                          <small>{review.locationName}</small>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              })}
            </Row>
          </Row>
        </Container>
      </div >
      {/* all versions */}
      <Container>

      </Container >
      <Footer />
      {/* <ClientBottomBar /> */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Encuentra tu fundación favorita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              _featuresAll.map((feature, index) => {
                return index != -1
                  ? <Row className="mb-4">
                    <Col xs={3}>
                      <i className={`fa-2xl ${feature.icon}`}></i>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <p>{feature.title}</p>
                    </Col>
                  </Row>
                  : <></>
              })
            }
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
      </>
    </>
  )
}

export default Client;