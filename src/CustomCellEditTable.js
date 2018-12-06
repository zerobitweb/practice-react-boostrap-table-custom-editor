import React from "react";
import ReactDOM from "react-dom";
import { FormControl, Button, Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateformat from "dateformat";
import DatePicker from "react-date-picker";

// Data
const products = [];

// Combobox options
const options = [
  { value: "", label: "" },
  { value: "000", label: "Label000" },
  { value: "001", label: "Label001" },
  { value: "002", label: "Label002" },
  { value: "003", label: "Label003" },
  { value: "004", label: "Label004" }
];

// Create Data
function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      customText: "CustomText" + id,
      customCheck: 1,
      customSelect: "00" + id,
      customDate: "2018/12/05",
      noCustom: "NoCustom" + id,
      customTime: "0" + id + ":00",
      customDate2: "2018-12-0" + (id + 1)
    });
  }
}

addProducts(5);

const cellEditProp = {
  mode: "click"
};

// CustomTextEditor
class CustomTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.updateData = this.updateData.bind(this);
  }
  focus() {
    //this.refs.inputRef.focus();
    let node = ReactDOM.findDOMNode(this.refs.inputRef);
    if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <FormControl
        ref="inputRef"
        className={this.props.editorClass}
        style={{ display: "inline" }}
        type="text"
        defaultValue={this.state.value}
        onKeyDown={this.props.onKeyDown}
        onBlur={this.updateData}
        onChange={ev => {
          this.setState({ value: ev.currentTarget.value });
        }}
      />
    );
  }
}
// CustomCheckboxEditor
class CustomCheckboxEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.updateData = this.updateData.bind(this);
  }
  focus() {
    this.refs.inputRef.focus();
    // let node = ReactDOM.findDOMNode(this.refs.inputRef);
    // if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <input
          ref="inputRef"
          className={this.props.editorClass}
          style={{ display: "inline" }}
          type="checkbox"
          defaultValue={this.state.value}
          defaultChecked={this.state.value === 1 ? true : false}
          onKeyDown={this.props.onKeyDown}
          onBlur={this.updateData}
          onChange={ev => {
            this.setState({ value: ev.currentTarget.checked ? 1 : 0 });
          }}
        />
      </div>
    );
  }
}
// CustomSelectEditor
class CustomSelectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.updateData = this.updateData.bind(this);
  }
  focus() {
    // this.refs.inputRef.focus();
    let node = ReactDOM.findDOMNode(this.refs.inputRef);
    if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <FormControl
        componentClass="select"
        ref="inputRef"
        className={this.props.editorClass}
        style={{ display: "inline" }}
        defaultValue={this.state.value}
        onKeyDown={this.props.onKeyDown}
        onBlur={this.updateData}
        onChange={ev => {
          this.setState({ value: ev.currentTarget.value });
        }}
      >
        {this.props.options.map((option, idx) => (
          <option value={option.value} key={idx}>
            {option.label}
          </option>
        ))}
      </FormControl>
    );
  }
}
// CustomDatepickerEditor
class CustomDatepickerEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      value: new Date(props.defaultValue),
      open: true
    };
  }
  focus() {
    // this.refs.inputRef.focus();
    let node = ReactDOM.findDOMNode(this.refs.inputRef);
    if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(dateformat(this.state.value, "yyyy/mm/dd"));
  }
  close = () => {
    this.setState({ open: false });
    this.props.onUpdate(this.props.defaultValue);
  };
  render() {
    return (
      <Modal
        show={this.state.open}
        onHide={this.close}
        animation={true}
        bsSize="small"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            ref="inputRef"
            className={this.props.editorClass}
            style={{ display: "inline" }}
            value={new Date(this.state.value)}
            onKeyDown={this.props.onKeyDown}
            onChange={ev => {
              this.setState({ value: ev });
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.updateData} bsStyle="primary">
            Save
          </Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
// CustomTimeEditor
class CustomTimeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.updateData = this.updateData.bind(this);
  }
  focus() {
    //this.refs.inputRef.focus();
    let node = ReactDOM.findDOMNode(this.refs.inputRef);
    if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <FormControl
        ref="inputRef"
        className={this.props.editorClass}
        style={{ display: "inline" }}
        type="time"
        defaultValue={this.state.value}
        onKeyDown={this.props.onKeyDown}
        onBlur={this.updateData}
        onChange={ev => {
          this.setState({ value: ev.currentTarget.value });
        }}
      />
    );
  }
}
// CustomDateEditor
class CustomDateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.updateData = this.updateData.bind(this);
  }
  focus() {
    //this.refs.inputRef.focus();
    let node = ReactDOM.findDOMNode(this.refs.inputRef);
    if (node && node.focus instanceof Function) node.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <FormControl
        ref="inputRef"
        className={this.props.editorClass}
        style={{ display: "inline" }}
        type="date"
        defaultValue={this.state.value}
        onKeyDown={this.props.onKeyDown}
        onBlur={this.updateData}
        onChange={ev => {
          this.setState({ value: ev.currentTarget.value });
        }}
      />
    );
  }
}

// Formatters
const customTextFormatter = (cell, row) => {
  return <FormControl type="text" defaultValue={cell} />;
};
const customCheckboxFormatter = (cell, row) => {
  return (
    <input
      type="checkbox"
      defaultValue={cell}
      defaultChecked={cell === 1 ? true : false}
    />
  );
};
const customSelectFormatter = (cell, row) => {
  return (
    <FormControl componentClass="select" defaultValue={cell}>
      {options.map((option, idx) => (
        <option value={option.value} key={idx}>
          {option.label}
        </option>
      ))}
    </FormControl>
  );
};
const customTimeFormatter = (cell, row) => {
  return <FormControl type="time" defaultValue={cell} />;
};
const customDateFormatter = (cell, row) => {
  return <FormControl type="date" defaultValue={cell} />;
};

/*
  The getElement function take two arguments,
  1. onUpdate: if you want to apply the modified data, call this function
  2. props: contain customEditorParameters, whole row data, defaultValue and attrs
*/
const createCustomTextEditor = (onUpdate, props) => (
  <CustomTextEditor onUpdate={onUpdate} {...props} />
);
const createCustomCheckboxEditor = (onUpdate, props) => (
  <CustomCheckboxEditor onUpdate={onUpdate} {...props} />
);
const createCustomSelectEditor = (onUpdate, props) => (
  <CustomSelectEditor onUpdate={onUpdate} {...props} />
);
const createCustomDatepickerEditor = (onUpdate, props) => (
  <CustomDatepickerEditor onUpdate={onUpdate} {...props} />
);
const createCustomTimeEditor = (onUpdate, props) => (
  <CustomTimeEditor onUpdate={onUpdate} {...props} />
);
const createCustomDateEditor = (onUpdate, props) => (
  <CustomDateEditor onUpdate={onUpdate} {...props} />
);

export default class CustomCellEditTable extends React.Component {
  constructor(props) {
    super(props);
    this.checkData = this.checkData.bind(this);
  }
  checkData(ev) {
    console.log(this.refs.table.state.data);
  }
  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={ev => this.checkData(ev)}>
          データ確認
        </Button>
        <BootstrapTable data={products} cellEdit={cellEditProp} ref="table">
          <TableHeaderColumn dataField="id" isKey={true}>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customText"
            editable={false}
            dataFormat={customTextFormatter}
            customEditor={{ getElement: createCustomTextEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomText
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customCheck"
            editable={true}
            headerAlign="center"
            dataFormat={customCheckboxFormatter}
            customEditor={{ getElement: createCustomCheckboxEditor }}
            tdStyle={{ textAlign: "center" }}
          >
            CustomCheckbox
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customSelect"
            editable={true}
            dataFormat={customSelectFormatter}
            customEditor={{
              getElement: createCustomSelectEditor,
              customEditorParameters: { options: options }
            }}
          >
            CustomSelect
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customDate"
            editable={true}
            customEditor={{ getElement: createCustomDatepickerEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomDate
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="noCustom"
            editable={false}
            dataFormat={(cell, row) => cell}
            customEditor={{ getElement: () => void 0 }}
            tdStyle={{ textAlign: "left" }}
          >
            NoCustom
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customTime"
            editable={true}
            dataFormat={customTimeFormatter}
            customEditor={{ getElement: createCustomTimeEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomTime
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customDate2"
            editable={true}
            dataFormat={customDateFormatter}
            customEditor={{ getElement: createCustomDateEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomDate HTML5
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
