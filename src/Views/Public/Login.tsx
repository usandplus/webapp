
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import styles from './../../Utils/styles.json'
import { signInWithGoogle } from '../../firebase/auth/authService'
import UNPButton from '../../Components/unp/UNPButton'

function Login() {
  const [loading, setLoading] = useState(false)
  
  let navigate = useNavigate()
  let location = useLocation()
  console.log(styles)
  const login = async () => {
    setLoading(true)
    await signInWithGoogle()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <Container style={{ maxWidth: '100vw' }}>
      <Row >
        {/* Login Form Column */}
        <Col
          xs={12}
          md={6}
          style={{
            backgroundImage: `linear-gradient(45deg, ${styles.palette.primary.main}, ${styles.palette.primary.dark})`,
            height: '100vh'
          }}>
          <Card
            className="p-4 shadow-lg mx-auto"
            style={{
              marginTop: '25vh',
              width: 350
            }}>
            <Card.Body className="text-center">
              <Card.Title className="mb-4">
              </Card.Title>
              <Form>
                <Form.Group className="">
                  <img
                    src="/name_rectangle.png"
                    className="img-fluid"
                    alt="Us & Plus" />
                  {
                    !loading
                      ? <UNPButton
                        variant="primary"
                        onClick={login}
                        className="w-100 mt-3">
                        Iniciar Sesión con Google
                      </UNPButton>
                      : <Spinner className="mt-3" />
                  }
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

        </Col>

        {/* Information Column */}
        <Col
          className="d-sm-none d-md-block vh-100"
          style={{
            backgroundImage: `linear-gradient(to left, ${styles.palette.background.default}, #FFF)`
          }}
          md={6}
        >
          <img
            style={{ marginTop: '25vh' }}
            src="/full_logo.png"
            className="img-fluid"
            alt="Us & Plus" />
        </Col>
      </Row>
    </Container>
  )
}

export default Login