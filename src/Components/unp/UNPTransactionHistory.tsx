import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Badge,
  Modal,
} from 'react-bootstrap';
import { jsPDF } from 'jspdf';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: string; // e.g., 'Donacion', 'Suscripcion'
  status: string; // e.g., 'Completado', 'Pendiente'
  paymentMethod: string;
  invoiceNumber: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-01',
    amount: '$50.00',
    type: 'Donacion',
    status: 'Completado',
    paymentMethod: 'Credit Card',
    invoiceNumber: 'INV-001',
  },
  {
    id: '2',
    date: '2024-01-03',
    amount: '$20.00',
    type: 'Suscripcion',
    status: 'Pendiente',
    paymentMethod: 'PayPal',
    invoiceNumber: 'INV-002',
  },
  {
    id: '3',
    date: '2024-01-05',
    amount: '$100.00',
    type: 'Suscripcion',
    status: 'Cancelado',
    paymentMethod: 'Bank Transfer',
    invoiceNumber: 'INV-003',
  },
];

const UNPTransactionHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType ? transaction.type === filterType : true;
    const matchesStatus = filterStatus ? transaction.status === filterStatus : true;
    return matchesType && matchesStatus;
  });

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleDownloadInvoice = () => {
    if (!selectedTransaction) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Transaction Invoice', 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice Number: ${selectedTransaction.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${selectedTransaction.date}`, 20, 50);
    doc.text(`Amount: ${selectedTransaction.amount}`, 20, 60);
    doc.text(`Type: ${selectedTransaction.type}`, 20, 70);
    doc.text(`Status: ${selectedTransaction.status}`, 20, 80);
    doc.text(`Payment Method: ${selectedTransaction.paymentMethod}`, 20, 90);

    doc.save(`${selectedTransaction.invoiceNumber}.pdf`);
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className='gx-0 '>
        <Row className="align-items-center mb-3">
          <Col xs={6}>
            <h4 className="text-primary">Historial de Transacciones</h4>
          </Col>
          <Col xs={6} className="text-end">
            <Button variant="outline-primary" size="sm" onClick={() => console.log('Export clicked')}>
              Exportar
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-3">
          <Col xs={6}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100">
                {filterType || 'Filtrar por tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterType(null)}>Todos</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType('Donacion')}>Donacion</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType('Suscripcion')}>Suscripcion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100">
                {filterStatus || 'Filtrar por estado'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus(null)}>Todos</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterStatus('Completado')}>Completado</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterStatus('Pendiente')}>Pendiente</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterStatus('Cancelado')}>Cancelado</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Row>
      {/* Transaction List */}
      <Row>
        {filteredTransactions.map((transaction) => (
          <Col xs={12} className="mb-3" key={transaction.id}><Card className="shadow-sm w-100">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <Row className="w-100 gx-0"> {/* gx-0 removes extra gutter spacing */}
                {/* First Column */}
                <Col xs={6}>
                  <Card.Text>
                    <h6 className="mb-1 text-primary">{transaction.type}</h6>
                    <span className="fw-bold me-2">{transaction.amount}</span>
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">{transaction.date}</small>
                  </Card.Text>
                </Col>

                {/* Second Column - Aligned to the Right */}
                <Col xs={6} className="text-end">
                  <Card.Text className="mt-2 mt-md-0">
                    <Badge
                      bg={
                        transaction.status === 'Completado'
                          ? 'success'
                          : transaction.status === 'Pendiente'
                            ? 'warning'
                            : 'danger'
                      }
                      text={
                        transaction.status === 'Completado'
                          ? 'light'
                          : transaction.status === 'Pendiente'
                            ? 'dark'
                            : 'light'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </Card.Text>
                  <Card.Text className="mt-2 mt-md-0">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleViewDetails(transaction)}
                    >
                      Detalles
                    </Button>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          </Col>
        ))}
      </Row>

      {/* No Transactions */}
      {filteredTransactions.length === 0 && (
        <Row>
          <Col xs={12} className="text-center py-4">
            <p className="text-muted">No transactions found.</p>
          </Col>
        </Row>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <>
              <p><strong>Invoice Number:</strong> {selectedTransaction.invoiceNumber}</p>
              <p><strong>Date:</strong> {selectedTransaction.date}</p>
              <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
              <p><strong>Type:</strong> {selectedTransaction.type}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Payment Method:</strong> {selectedTransaction.paymentMethod}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UNPTransactionHistory;
