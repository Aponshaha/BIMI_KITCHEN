import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Footer = () => {
    return (
        <div >
            <Card className="text-center mt-auto"   style={{fontSize:'15px', paddingTop: '5%' }}>
                <Card.Header variant="Dark">Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button className="btn_blue">Go somewhere</Button>

                </Card.Body>
                <Card.Footer className="text-muted"><p>&copy; 2022 BIMI KITCHEN</p></Card.Footer>
                {/* <Card.Footer className="text-muted"><p>&copy; 2022 BIMI KITCHEN</p></Card.Footer> */}
            </Card>
        </div>
    );
}

export default Footer;
