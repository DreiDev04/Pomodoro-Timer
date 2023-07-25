import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FontAwesomeIcon from "./FontAwesomeIcon";
import Modal from "react-bootstrap/Modal";
import "./modal.scss";

export default function Pomodoro() {
  // States
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLeft, setTimerLeft] = useState(25 * 60);
  const [formattedTime, setFormattedTime] = useState("25:00");
  const [centerText, setCenterText] = useState("Stay Focused");
  const [modalTitle, setModalTitle] = useState("It's Break Time");
  const [modalBodyText, setModalBodyText] = useState(
    "Take a break; rest, refocus, and come back stronger."
  );
  const [show, setShow] = useState(false);
  const [isBreakOver, setIsBreakOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  //Modal Functions
  const handleClose = () => {
    stopSound();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Refs
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Effects
  useEffect(() => {
    setTimerLeft(sessionLength * 60);
    setFormattedTime(formatTime(sessionLength * 60));
  }, [sessionLength]);
  useEffect(() => {
    setFormattedTime(formatTime(timerLeft));
  }, [timerLeft]);

  //Timer Functions
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const startTimer = () => {
    setIsPlaying(true);
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        
        updateTimer();
      }, 1000);
    }
  };
  const pauseTimer = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const resetTimer = () => {
    stopSound();
    pauseTimer();
    setSessionLength(25);
    setBreakLength(5);
    setTimerLeft(25 * 60);
    setFormattedTime("25:00");
    setCenterText("Stay Focused");
  };
  const updateTimer = () => {
    setTimerLeft((prevTime) => {
      if (prevTime <= 0) {
        console.log("Tpdate Time");
        playSound();
        handleShow();
        return 0;
      } else {
        return prevTime - 1;
      }
    });
  };

  // Sound Functions
  const playSound = () => {
    if (audioRef.current === null) return;
    audioRef.current.play();
  };
  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    pauseTimer();
  };

  // Button Functions
  const incrementSession = () => {
    if (!isPlaying) {
      setSessionLength((prevSessionLength) => prevSessionLength + 1);
    }
  };
  const decrementSession = () => {
    if (!isPlaying && sessionLength > 1) {
      setSessionLength((prevSessionLength) => prevSessionLength - 1);
    }
  };
  const incrementBreak = () => {
    if (!isPlaying) {
      setBreakLength((prevBreakLength) => prevBreakLength + 1);
    }
  };
  const decrementBreak = () => {
    if (!isPlaying && breakLength > 1) {
      setBreakLength((prevBreakLength) => prevBreakLength - 1);
    }
  };

  // Modal Functions
  const skipBreak = () => {
    stopSound();
    handleClose();
    setFormattedTime(formatTime(sessionLength * 60));
    setTimerLeft(sessionLength * 60);
  };

  const takeBreak = () => {
    stopSound();
    handleClose();
    setFormattedTime(formatTime(breakLength * 60));
    setTimerLeft(breakLength * 60);
    setCenterText("Break Time");
    setModalTitle("Break's Over!");
    setModalBodyText("Time to get back to work. Stay focused!");
    setIsBreakOver(true);
  };

  const continueFocus = () => {
    handleClose();
    setFormattedTime(formatTime(sessionLength * 60));
    setTimerLeft(sessionLength * 60);
    setCenterText("Stay Focused");
    setIsBreakOver(false);
    // startTimer(); // Uncomment this to automatically start the timer after break
  };

  const timerPercentage = (
    (1 - timerLeft / (sessionLength * 60)) *
    100
  ).toFixed(2);
  const dashArray = 283;
  const dashOffset = ((100 - timerPercentage) / 100) * dashArray;

  return (
    <div className="pomodoro">
      <h1 className="title">Pomodoro Timer</h1>
      <Container className="focus">
        <div className="timer-container">
          <div className="timer-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
              <circle
                className="timer-circle-progress"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: dashOffset,
                }}
              />
            </svg>
            <div className="timer-text">
              <h2 id="timer-label">{centerText}</h2>
              <h2 id="time-left">{formattedTime}</h2>
            </div>
          </div>
        </div>

        <Row className="btn_container">
          <Col>
            <Button
              variant="dark"
              id="start_stop"
              onClick={isPlaying ? pauseTimer : startTimer}
            >
              <FontAwesomeIcon
                icon={`fa-solid fa-${isPlaying ? "pause" : "play"}`}
              />
            </Button>
          </Col>
          <Col>
            <Button variant="dark" id="reset" onClick={resetTimer}>
              <FontAwesomeIcon icon="fa-solid fa-repeat" />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="set-timer">
        <Row>
          <Col id="session-label">
            <h2>Session</h2>
            <Button
              variant="dark"
              id="session-increment"
              onClick={incrementSession}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
            </Button>
            <span id="session-length">{sessionLength}</span>
            <Button
              variant="dark"
              id="session-decrement"
              onClick={decrementSession}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
            </Button>
          </Col>
          <Col id="break-label">
            <h2>Break</h2>
            <Button
              variant="dark"
              id="break-increment"
              onClick={incrementBreak}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
            </Button>
            <span id="break-length">{breakLength}</span>
            <Button
              variant="dark"
              id="break-decrement"
              onClick={decrementBreak}
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
            </Button>
          </Col>
        </Row>
      </Container>

      <audio ref={audioRef}>
        <source
          src="./src/sounds/beep.wav"
          type="audio/wav"
          ref={audioRef}
          id="beep"
        />
        Your browser does not support the audio element.
      </audio>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBodyText}</Modal.Body>
        <Modal.Footer>
          {isBreakOver ? (
            <Button variant="success" onClick={continueFocus}>
              Continue focus
            </Button>
          ) : (
            <>
              <Button variant="danger" onClick={skipBreak}>
                Skip Break
              </Button>
              <Button variant="primary" onClick={takeBreak}>
                Take a Break
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
