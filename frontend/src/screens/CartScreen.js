import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
//import Badge from 'react-bootstrap/Badge';

import { RelatedProducts } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

const recommendClient = recommend(
  '8GNM3PIMWN', //Application ID
  'ead73c8ee0af4efd071d851c4bf5f110' //Search-Only API Key
);
const indexName = 'AI_Product_Recommendations';

// Define a custom class for the RelatedProducts component
const relatedProductsClass = 'custom-related-products';

function RelatedItem({ item }) {
  return (
    <Card
      style={{
        width: '14rem',
        margin: '10px',
      }}
    >
      <Link to={`/product/${item.slug}`}>
        <Card.Img variant="top" src={item.image} alt={item.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${item.slug}`}>
          <Card.Title>{item.name}</Card.Title>
        </Link>
        <div style={{ display: 'flex' }}>
          {' '}
          <Rating rating={item.rating} numReviews={item.numReviews} />
        </div>
        <Card.Text>${item.price}</Card.Text>
        <Card.Text>
          {item.countInStock > 0 ? (
            <Button variant="primary">Add to cart</Button>
          ) : (
            //<Badge bg="danger">Out of stock</Badge>
            <span
              style={{
                marginTop: '23px',
                marginBottom: '7px',
                display: 'block',
                //fontWeight: 'normal',
                color: '#53575B',
              }}
            >
              Out of stock
            </span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [currentObjectID, setCurrentObjectID] = useState(null);
  useEffect(() => {
    if (cartItems.length > 0) {
      setCurrentObjectID(cartItems[0]._id); // Set the current object ID to the ID of the first item in the cart
    }
  }, [cartItems]);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* AI Product Recommendations............................................................... */}
      {cartItems.length > 0 && (
        <div className="related-products-container">
          <h1 className="related-products-title">You May Also Like</h1>
          {currentObjectID && (
            <RelatedProducts
              recommendClient={recommendClient}
              indexName={indexName}
              objectIDs={[currentObjectID]}
              classNames={{
                list: relatedProductsClass, // Assign the custom class to the list
                //list: 'd-flex flex-row gap-2',
                title: 'invisible',
                //item: 'w-10 h-10',
              }}
              itemComponent={RelatedItem}
              transformItems={
                (items) =>
                  items
                    .filter(
                      (item) =>
                        !cartItems.find(
                          (cartItem) => cartItem._id === item.objectID
                        )
                    )
                    .slice(0, 5) // Limit the number of items to 5
              }
            />
          )}
        </div>
      )}
      {/* Add the style tag here */}
      <style>
        {`
        .related-products-container {
         margin-left: -42px;  // Adjust the left margin to reduce the space         
        }   
        
        .related-products-title {          
          margin-bottom: -45px; // Add some spacing between the title and the related products list 
          margin-top: 0px;         
          margin-left: 42px;          
        }
        
        .${relatedProductsClass} {
          display: flex;           // Display the list items in a row
          gap: 10px;               // Add a small gap between the items
          overflow-x: auto;        // Enable horizontal scrolling if needed
          white-space: nowrap;     // Prevent line breaks between items          
        }
        
        .${relatedProductsClass} li {
          display: inline-block;   // Display the list items as inline-block elements
          list-style-type: none;  // Removes the default bullet or number list-style from the list items
        }
        `}
      </style>
      {/* ......................................................................................... */}
    </div>
  );
}
