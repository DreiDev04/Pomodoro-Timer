import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function Task() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      // Check if the task is not empty or only whitespace
      const newTaskList = [...taskList, task];
      setTaskList(newTaskList);
      setTask("");
      
      console.log("New Task List:", newTaskList);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTask();
  };

  const handleTaskDelete = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const taskItems = () => {
    return taskList.map((task, index) => (
      <div className="tasks-container" key={index}>
        <div className="check">
          <Form.Check
            type="checkbox"
            id={`checkbox-${index}`}
            className="all-check"
          />
          <p className="task--item">{task}</p>
        </div>
        <div className="delete">
          <Button variant="danger" onClick={() => handleTaskDelete(index)}>
            <i className="fa-solid fa-trash-can"></i>
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="task--title">
      <div className="task">
        <h1 className="title--task">Task</h1>
        <Button variant="dark">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Button>
      </div>

      {taskItems()}

      <div className="task-add">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={9} md={10}>
              <Form.Control
                placeholder="What are you working on?"
                onChange={handleInputChange}
                id="customInput"
              />
            </Col>
            <Col xs={3} md={2}>
              <Button variant="dark" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
