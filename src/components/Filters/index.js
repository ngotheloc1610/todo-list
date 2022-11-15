import { Col, Row, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import filtersSlice from "./filtersSlice";

export default function Filters() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value));
  };

  return (
    <Row justify="center" style={{ marginBottom: "20px" }}>
      <Col span={24}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Col>
    </Row>
  );
}
