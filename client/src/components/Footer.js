import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Footer = () => {
    return (
        <footer className="footer" >
            <Card className="text-center mt-auto bg-dark text-white" border="light">
                <Card.Header variant="Dark">Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button className="btn_grad">BIMI KITCHEN</Button>

                </Card.Body>
                <Card.Footer className="text-muted"><p>&copy; 2022 BIMI KITCHEN</p></Card.Footer>
                {/* <Card.Footer className="text-muted"><p>&copy; 2022 BIMI KITCHEN</p></Card.Footer> */}
            </Card>
        </footer>
    );
}

export default Footer;
