import { Col, Row, Input, Select, Tag, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "../Todo";
import "./todo.css";
import { todosRemainingSelector } from "../../redux/selectors";
import todoListSlice from "./todosSlice";
import TextArea from "antd/lib/input/TextArea";
import Filters from "../Filters";

const getDataFromLS = () => {
  const data = localStorage.getItem("todoList");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [error, setError] = useState(false);

  const todoList = useSelector(todosRemainingSelector);

  const [todos, setTodos] = useState(getDataFromLS());

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    setTodos(getDataFromLS());
  }, [todoList]);

  // const todos = getDataFromLS();

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    if (todoName) {
      setError(false);
      dispatch(
        todoListSlice.actions.addTodo({
          id: uuidv4(),
          name: todoName,
          description: description,
          date: date,
          priority: priority,
          completed: false,
        })
      );

      setTodoName("");
      setPriority("Normal");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
    } else {
      setError(true);
    }
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleInputDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <Row>
      <Col span={12} className="task">
        <h3>New Task </h3>
        <Input.Group compact>
          <Input
            value={todoName}
            onChange={handleInputChange}
            placeholder="Add new task..."
            required
            style={{ marginBottom: "15px" }}
          />
          <span className={error ? "error" : "not-error"}>
            Please input your title!
          </span>

          <label htmlFor="description">Description</label>
          <TextArea
            id="description"
            rows={4}
            value={description}
            onChange={handleInputDescriptionChange}
            style={{ marginBottom: "15px" }}
          />
          <Col span={12} className="col-6">
            <label htmlFor="date">Due Date</label>
            <input
              type="date"
              onChange={handleDateChange}
              // defaultValue={date}
              value={date}
            />
          </Col>
          <Col span={12} className="col-6">
            <label htmlFor="priority">Priority</label>
            <Select
              id="priority"
              defaultValue="Normal"
              value={priority}
              onChange={handlePriorityChange}
            >
              <Select.Option value="High" label="High">
                <Tag color="red">High</Tag>
              </Select.Option>
              <Select.Option value="Normal" label="Normal">
                <Tag color="blue">Normal</Tag>
              </Select.Option>
              <Select.Option value="Low" label="Low">
                <Tag color="gray">Low</Tag>
              </Select.Option>
            </Select>
          </Col>

          <button onClick={handleAddButtonClick} className="btn-green">
            Add
          </button>
        </Input.Group>
      </Col>
      <Col span={12} className="todo">
        <div className="todo-header">
          <h3>To Do List</h3>
          <Filters />
          {todos?.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              name={todo.name}
              priority={todo.priority}
              description={todo.description}
              date={todo.date}
              completed={todo.completed}
            />
          ))}
        </div>
        <div className="todo-footer">
          <span>Bulk Action:</span>
          <span className="btn-group">
            <button className="btn btn-primary btn-large">Done</button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => {
                dispatch(todoListSlice.actions.clearList());
              }}
            >
              Remove
            </button>
          </span>
        </div>
      </Col>
    </Row>
  );
}
