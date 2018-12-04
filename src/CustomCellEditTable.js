import React from "react";
import ReactDOM from "react-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { FormControl, Button } from "react-bootstrap";

const products = [];

const options = [
  { value: "", label: "" },
  { value: "001", label: "Label001" },
  { value: "002", label: "Label002" },
  { value: "003", label: "Label003" },
  { value: "004", label: "Label004" }
];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      customText: "CustomText" + id,
      customCheck: 1,
      customSelect: "001"
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
        {options.map((option, idx) => (
          <option value={option.value} key={idx}>
            {option.label}
          </option>
        ))}
      </FormControl>
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
            dataFormat={customTextFormatter}
            customEditor={{ getElement: createCustomTextEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomText
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customCheck"
            dataFormat={customCheckboxFormatter}
            customEditor={{ getElement: createCustomCheckboxEditor }}
            tdStyle={{ textAlign: "left" }}
          >
            CustomCheckbox
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customSelect"
            dataFormat={customSelectFormatter}
            customEditor={{
              getElement: createCustomSelectEditor,
              customEditorParameters: { options: options }
            }}
          >
            CustomSelect
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
