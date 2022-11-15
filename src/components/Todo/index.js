import { Row, Tag, Checkbox, Input, Select, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../TodoList/todosSlice";

export default function Todo({
  id,
  name,
  priority,
  completed,
  description,
  date,
}) {
  const [checked, setChecked] = useState(completed);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const [updateTitle, setUpdateTitle] = useState(name);
  const [updateDesc, setUpdateDesc] = useState(description);
  const [updatePriority, setUpdatePriority] = useState(priority);
  const [updateDate, setUpdateDate] = useState(date);

  const dispatch = useDispatch();

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.toggleTodoStatus(id));
  };

  const handleInputChange = (e) => {
    setUpdateTitle(e.target.value);
  };

  const handleInputDescriptionChange = (e) => {
    setUpdateDesc(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setUpdatePriority(value);
  };

  const handleDateChange = (e) => {
    setUpdateDate(e.target.value);
  };

  return (
    <>
      <Row
        style={{
          marginBottom: "15px",
          border: "1px solid #000",
          padding: "10px",
          ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
        }}
      >
        <Checkbox checked={checked} onChange={toggleCheckbox}>
          {updateTitle}
        </Checkbox>
        <button
          className="btn btn-primary btn-small"
          onClick={() => setIsOpenDetail(!isOpenDetail)}
        >
          Detail
        </button>
        <button
          className="btn btn-secondary btn-small"
          onClick={() => {
            dispatch(todoListSlice.actions.removeTodo(id));
          }}
        >
          Remove
        </button>

        {isOpenDetail && (
          <div style={{ paddingTop: "20px" }}>
            <Input.Group compact>
              <Input
                value={updateTitle}
                onChange={handleInputChange}
                style={{ marginBottom: "15px" }}
              />
              <label htmlFor="description">Description</label>
              <TextArea
                id="description"
                rows={4}
                value={updateDesc}
                onChange={handleInputDescriptionChange}
                style={{ marginBottom: "15px" }}
              />
              <Col span={12} className="col-6">
                <label htmlFor="date">Due Date</label>
                <input
                  type="date"
                  onChange={handleDateChange}
                  value={updateDate}
                />
              </Col>
              <Col span={12} className="col-6">
                <label htmlFor="priority">Priority</label>
                <Select
                  id="priority"
                  defaultValue="Normal"
                  value={updatePriority}
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
              <button
                className="btn-green"
                onClick={() => {
                  dispatch(
                    todoListSlice.actions.updateTodo({
                      id: id,
                      name: updateTitle,
                      description: updateDesc,
                      date: updateDate,
                      priority: updatePriority,
                      completed: false,
                    })
                  );
                  setIsOpenDetail(false);
                }}
              >
                Update
              </button>
            </Input.Group>
          </div>
        )}
      </Row>
    </>
  );
}
