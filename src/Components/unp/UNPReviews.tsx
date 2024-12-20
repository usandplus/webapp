import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UNPButton from './UNPButton';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

interface Review {
    avatar: string;
    name: string;
    description: string;
    reviewText: string;
}

interface UNPReviewsProps {
    averageRating: number;
    aiReview: string;
    reviews: Review[];
}

const UNPReviews: React.FC<UNPReviewsProps> = ({ averageRating, aiReview, reviews }) => {
    // State for modal visibility and current page
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const reviewsPerPage = 1; // Change this to 1 to view one review at a time
    const totalReviews = reviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    // Function to handle modal open
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Function to get current review
    const getCurrentReview = () => {
        return reviews[currentPage];
    };

    // Function to go to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to go to the previous page
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Create array to handle star rendering (1 to 5 stars)

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
    
        return (
          <>
            {Array(fullStars).fill(<FaStar className="text-primary" />)}
            {halfStar === 1 && <FaStarHalfAlt className="text-primary"/>}
            {Array(emptyStars).fill(<FaRegStar className="text-primary" />)}
          </>
        );
      };

    return (
        <Container fluid className="p-3">
            <h2 className="mt-3 mb-5 text-primary fw-bolder">Calificaciones</h2>
            <Row>
                {/* Left Column: Average Rating and AI Review */}
                <Col>
                    <Row>
                        <Col className="text-center">
                            <Image
                                rounded
                                src={'/stock/stock (6).jpg'}
                                alt={'Fundacion'}
                                style={{
                                    maxHeight: 200,
                                }}
                            />
                            <h3>Fundacion Perritos y Gatitos</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="">
                            {/* Rating Stars */}
                            <div className="d-flex justify-content-center">
                                {renderStars(averageRating)}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mb-3">
                            <small className="text-muted">143 calificaciones</small>
                            {/* Average Review Title */}
                            <h5>Calificacion promedio: {averageRating}</h5>
                        </Col>
                    </Row>
                    <Row>
                        {/* AI-generated Review */}
                        <Col className="mb-3">
                            <Alert className='ai_review'>
                                {aiReview}
                            </Alert>
                        </Col>
                    </Row>
                </Col>
                {/* Right Column: Reviews */}
                <Col md={8}>
                    {reviews.slice(0, 3).map((review, index) => ( // Display only the first 3 reviews
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <div className="d-flex">
                                    <Image
                                        rounded
                                        src={review.avatar}
                                        alt={review.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginRight: '15px',
                                        }}
                                    />
                                    <div>
                                        <h6>{review.name}</h6>
                                        <small className="text-muted">{review.description}</small>
                                    </div>
                                </div>
                                <Card.Text className="mt-3">
                                    {review.reviewText}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}

                    {/* See All Reviews Button */}
                    <UNPButton variant="primary" className="w-100 mt-3" onClick={handleShowModal}>
                        Ver todas las calificaciones
                    </UNPButton>
                </Col>
            </Row>

            {/* Modal for all reviews */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="xl"
                className="custom-modal" // Add your custom class here if needed
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>All Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Current Review */}
                    <Card className="mb-3">
                        <Card.Body>
                            <div className="d-flex">
                                <img
                                    src={getCurrentReview()?.avatar}
                                    alt={getCurrentReview()?.name}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: '15px',
                                    }}
                                />
                                <div>
                                    <h6>{getCurrentReview()?.name}</h6>
                                    <small className="text-muted">{getCurrentReview()?.description}</small>
                                </div>
                            </div>
                            <Card.Text className="mt-3">
                                {getCurrentReview()?.reviewText}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Pagination Counter */}
                    <div className="text-center mb-3">
                        {`Review ${currentPage + 1} of ${totalReviews}`}
                    </div>

                    {/* Responsive Pagination Controls */}
                    <Row className="d-none d-md-flex justify-content-between mb-3">
                        <Col>
                            <UNPButton
                                variant="primary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </UNPButton>
                        </Col>
                        <Col md={2} xl={1}>
                            <UNPButton
                                variant="primary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                            >
                                Next
                            </UNPButton>
                        </Col>
                    </Row>

                    {/* Small Buttons for Mobile */}
                    <div className="d-md-none d-flex justify-content-between">
                        <UNPButton
                            variant="primary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="flex-fill me-1"
                        >
                            Prev
                        </UNPButton>
                        <UNPButton
                            variant="primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="flex-fill ms-1"
                        >
                            Next
                        </UNPButton>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default UNPReviews;
