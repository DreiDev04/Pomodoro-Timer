import "./style.scss";
import Navbar from "./components/Navbar";
import Pomodoro from "./components/Pomodoro";
import Task from "./components/Task";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar />
      <Container className="cont">
        <Row className="justify-content-center text-center">
          <Col md={8} xl={6}>
            <Pomodoro />
            <Task />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
