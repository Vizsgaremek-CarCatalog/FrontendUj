import React, { useState, useEffect } from "react";
import axios from "./services/axiosConfig";
import { Button, Form, ListGroup, Card, Row, Col, Container, Collapse } from "react-bootstrap";
import { FaTrashAlt, FaComments } from "react-icons/fa";

interface Car {
  id: number;
  vehicle: string;
  type: string;
  color: string;
  fuel: string;
  manufacturer: string;
  mass: number;
  imageUrl?: string;
  price: number;
  description: string;
  yearMade: number;
  horsePower: number;
}

interface Comment {
  id: number;
  carId: number;
  text: string;
}

const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    vehicle: "",
    type: "",
    color: "",
    fuel: "",
    manufacturer: "",
    mass: 0,
    imageUrl: "",
    price: 0,
    description: "",
    yearMade: new Date().getFullYear(),
    horsePower: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchCarsAndComments();
  }, []);

  const fetchCarsAndComments = async () => {
    try {
      const carsResponse = await axios.get("http://localhost:3000/carcatalog");
      setCars(carsResponse.data);

      // Fetch comments for each car
      const commentsByCar: { [key: number]: Comment[] } = {};
      await Promise.all(
        carsResponse.data.map(async (car: Car) => {
          try {
            const commentsResponse = await axios.get(`http://localhost:3000/comments/${car.id}`);
            commentsByCar[car.id] = commentsResponse.data;
          } catch (err) {
            console.error(`Error fetching comments for car ${car.id}:`, err);
          }
        })
      );
      setComments(commentsByCar);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to load cars or comments.");
    }
  };

  const addCar = async () => {
    if (!newCar.vehicle || !newCar.type || !newCar.color || !newCar.price) {
      setError("Please fill in all the required fields.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/carcatalog", newCar);
      setCars([...cars, response.data]);
      setNewCar({
        vehicle: "",
        type: "",
        color: "",
        fuel: "",
        manufacturer: "",
        mass: 0,
        imageUrl: "",
        price: 0,
        description: "",
        yearMade: new Date().getFullYear(),
        horsePower: 0,
      });
    } catch (error) {
      console.error("Error adding car", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/carcatalog/${id}`);
      setCars(cars.filter((car) => car.id !== id));
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[id];
        return newComments;
      });
    } catch (error) {
      console.error("Error deleting car", error);
    }
  };

  const deleteComment = async (carId: number, commentId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(parseInt(userId, 10))) {
      setError("You must be logged in as an admin to delete comments.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: {
          "user-id": userId,
        },
      });
      setComments((prev) => ({
        ...prev,
        [carId]: prev[carId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error: any) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  const toggleComments = (carId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Add Car Form */}
      <Card className="mb-4">
        <Card.Body>
          <h3>Add New Car</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="vehicle">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter vehicle name"
                    value={newCar.vehicle}
                    onChange={(e) => setNewCar({ ...newCar, vehicle: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="type">
                  <Form.Label>Car Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter car type"
                    value={newCar.type}
                    onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="color">
                  <Form.Label>Car Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter car color"
                    value={newCar.color}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fuel">
                  <Form.Label>Fuel Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter fuel type"
                    value={newCar.fuel}
                    onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="manufacturer">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter manufacturer"
                    value={newCar.manufacturer}
                    onChange={(e) => setNewCar({ ...newCar, manufacturer: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mass">
                  <Form.Label>Mass (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter mass in kg"
                    value={newCar.mass}
                    onChange={(e) => setNewCar({ ...newCar, mass: +e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="imageUrl">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={newCar.imageUrl}
                    onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: +e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={newCar.description}
                    onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="yearMade">
                  <Form.Label>Year Made</Form.Label>
                  <Form.Control
                    type="number"
                    value={newCar.yearMade}
                    onChange={(e) => setNewCar({ ...newCar, yearMade: +e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="horsePower">
                  <Form.Label>Horse Power</Form.Label>
                  <Form.Control
                    type="number"
                    value={newCar.horsePower}
                    onChange={(e) => setNewCar({ ...newCar, horsePower: +e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={addCar} disabled={isSubmitting} className="mt-3">
              {isSubmitting ? "Adding..." : "Add Car"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Car List */}
      <h3>Cars in Catalog</h3>
      <Row>
        {cars.map((car) => (
          <Col key={car.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4 shadow-sm">
              {car.imageUrl && <Card.Img variant="top" src={car.imageUrl} />}
              <Card.Body>
                <Card.Title>{car.vehicle}</Card.Title>
                <Card.Text>{car.color} - {car.price}$ - {car.yearMade}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={() => deleteCar(car.id)}>
                    <FaTrashAlt /> Delete Car
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => toggleComments(car.id)}
                    aria-expanded={openComments[car.id]}
                  >
                    <FaComments /> Comments ({(comments[car.id] || []).length})
                  </Button>
                </div>

                {/* Comments Section */}
                <Collapse in={openComments[car.id]}>
                  <div className="mt-3">
                    <ListGroup>
                      {(comments[car.id] || []).length > 0 ? (
                        comments[car.id].map((comment) => (
                          <ListGroup.Item
                            key={comment.id}
                            className="d-flex justify-content-between align-items-center"
                          >
                            {comment.text}
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteComment(car.id, comment.id)}
                            >
                              <FaTrashAlt />
                            </Button>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item>No comments yet.</ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;