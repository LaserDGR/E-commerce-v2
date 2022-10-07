import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { addProductThunk } from '../store/slices/carSidebar.slice';

const ProducDetail = () => {
  const { id } = useParams();
  const productList = useSelector((state) => state.product)
  const [ quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const producttDetail = productList.find((product) => product.id === Number(id))
  const relatedProducts = productList.filter((product) => product?.category.id === producttDetail?.category.id)

  useEffect(() => {
    setQuantity(0)
  }, [id])

  const addToCar = () => {
    const products = {
      id: id,
      quantity: quantity
    }
    dispatch(addProductThunk(products))
  }

  return (
    <Row>
      <Col style={{textAlign: "center"}}>
        <h1>{producttDetail?.title}</h1>
        <img className='img-fluid' style={{objectFit: "contain", height: "450px"}} src={producttDetail?.productImgs} alt="" />
        <p style={{marginTop: "30px", fontSize: "17px"}} className="pH">{producttDetail?.description}</p>
        <p className='price'>Price: <br />${producttDetail?.price}</p>
        <div className='quantity'>
          <Button className='me-5' onClick={() => setQuantity(quantity-1)}>-</Button>
          {quantity}
          <Button className='ms-5' onClick={() => setQuantity(quantity+1)}>+</Button>
        </div>
        <Button className='mt-4' variant="dark" onClick={addToCar}>
          Add To Car
          </Button>{' '}
      </Col>

      <Col lg={3}>
        <ListGroup>
          {
            relatedProducts.map((products) => (
              <ListGroup.Item key={products.id} style={{marginBottom: "35px", border: "8px solid lavender", textAlign: "center", boxShadow: "0 0 10px lavender, 0 0 40px lavender, 0 0 80px lavender"}}>
                <Link to={`/product/${products.id}`}>
                  {products.title} 
                  <img style={{objectFit: "contain", height: "150px"}} className='img-fluid' src={products.productImgs} /> <br />  Price: <br />{products.price} 
                  <button  style={{ backgroundImage: "url(/Img/carrito-de-compras.png)", 
                  width: "35px", height: "35px", borderRadius: "50px", backgroundPosition: "center", marginLeft: "85px"}}></button>
                </Link>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProducDetail;