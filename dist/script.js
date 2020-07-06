class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaString: "",
      outputValue: "0",
      isDecimalPressed: false,
      isOperatorPressed: false,
      isEqualsPressed: false };

    this.numberPressed = this.numberPressed.bind(this);
    this.operatorPressed = this.operatorPressed.bind(this);
    this.decimalPressed = this.decimalPressed.bind(this);
    this.equalsPressed = this.equalsPressed.bind(this);
    this.clearPressed = this.clearPressed.bind(this);
  }


  numberPressed(e) {
    let eventsNumber = e.target.innerText;
    let newOutputValue = this.state.outputValue.concat(eventsNumber);
    let newFormulaString = this.state.formulaString.concat(eventsNumber);
    let formulaStringLastChar = this.state.formulaString[this.state.formulaString.length - 1];
    let lastCharRegex = /\w$/;
    let zeroAferOperatorRegex = /[-+*/]+0$/;
    let replaceZero = "";
    let zeroRegex = /^0$/;


    if (this.state.isOperatorPressed) {

      this.setState({ formulaString: newFormulaString,
        outputValue: eventsNumber,
        isOperatorPressed: false });

    } else if (this.state.isEqualsPressed) {

      this.setState({ formulaString: eventsNumber,
        outputValue: eventsNumber,
        isEqualsPressed: false });

    } else if (this.state.formulaString == "0" || this.state.formulaString === "") {

      if (eventsNumber != "0") {
        this.setState({ formulaString: eventsNumber,
          outputValue: eventsNumber });
      } else if (eventsNumber == "0") {
        this.setState({ formulaString: "0",
          outputValue: "0" });
      }

    } else if (this.state.formulaString) {

      if (zeroAferOperatorRegex.test(this.state.formulaString)) {
        this.setState({ formulaString: this.state.formulaString.replace(lastCharRegex, eventsNumber),
          outputValue: eventsNumber });
      } else {
        this.setState({ formulaString: newFormulaString,
          outputValue: newOutputValue });
      }
    }
  }


  operatorPressed(e) {
    let eventsOperator = e.target.innerText;
    let newFormulaString = this.state.formulaString.concat(eventsOperator);
    let formulaStringLastChar = this.state.formulaString[this.state.formulaString.length - 1];
    let lastOperatorsRegex = /[-+*/]+$/;

    if (this.state.isOperatorPressed) {

      if (eventsOperator == "-" && formulaStringLastChar !== "-") {
        this.setState({ formulaString: newFormulaString,
          outputValue: eventsOperator });

      } else if (eventsOperator != "-") {
        let replacedString = this.state.formulaString.replace(lastOperatorsRegex, eventsOperator);
        this.setState({ formulaString: replacedString,
          outputValue: eventsOperator });
      } else {
        return;
      }
    } else {
      this.setState({ formulaString: newFormulaString,
        outputValue: eventsOperator,
        isDecimalPressed: false,
        isOperatorPressed: true,
        isEqualsPressed: false });
    }
  }


  decimalPressed(e) {
    let decimalOperator = e.target.innerText;
    let zeroDecimal = `0.`;
    let decimalConcatenated = this.state.formulaString.concat(decimalOperator);
    let zeroDecimalConcatenated = this.state.formulaString.concat(zeroDecimal);
    let newOutputValue = this.state.outputValue.concat(decimalOperator);

    if (this.state.isDecimalPressed === true) {
      return;
    } else if (this.state.isOperatorPressed === true) {

      this.setState({ formulaString: zeroDecimalConcatenated,
        outputValue: zeroDecimal,
        isDecimalPressed: true,
        isOperatorPressed: false });

    } else if (this.state.isEqualsPressed === true || this.state.formulaString === "") {

      this.setState({ formulaString: zeroDecimal,
        outputValue: zeroDecimal,
        isDecimalPressed: true,
        isEqualsPressed: false });

    } else {
      this.setState({ formulaString: decimalConcatenated,
        outputValue: newOutputValue,
        isDecimalPressed: true });
    }
  }


  equalsPressed(e) {
    let result = eval(this.state.formulaString).toString();

    this.setState({ formulaString: result,
      outputValue: result,
      isOperatorPressed: false,
      isDecimalPressed: false,
      isEqualsPressed: true });
  }


  clearPressed(e) {
    this.setState({ formulaString: "",
      outputValue: "0",
      isDecimalPressed: false,
      isOperatorPressed: false,
      isEqualsPressed: false });
  }


  render() {

    return (
      React.createElement("div", null,
      React.createElement("div", { class: "calculator" },
      React.createElement("div", { class: "visor" },
      React.createElement("div", { class: "formulaScreen" }, React.createElement("span", null, this.state.formulaString)),
      React.createElement("div", { class: "outputScreen", id: "display" }, React.createElement("span", null, this.state.outputValue))),

      React.createElement("div", { class: "btnsGrid" },
      React.createElement("button", { class: "clear btns", id: "clear", onClick: this.clearPressed }, "A/C"),
      React.createElement("button", { class: "operator btns", id: "divide", onClick: this.operatorPressed }, "/"),
      React.createElement("button", { class: "operator btns", id: "multiply", onClick: this.operatorPressed }, "*"),
      React.createElement("button", { class: "number btns", id: "seven", onClick: this.numberPressed }, "7"),
      React.createElement("button", { class: "number btns", id: "eight", onClick: this.numberPressed }, "8"),
      React.createElement("button", { class: "number btns", id: "nine", onClick: this.numberPressed }, "9"),
      React.createElement("button", { class: "operator btns", id: "subtract", onClick: this.operatorPressed }, "-"),
      React.createElement("button", { class: "number btns", id: "four", onClick: this.numberPressed }, "4"),
      React.createElement("button", { class: "number btns", id: "five", onClick: this.numberPressed }, "5"),
      React.createElement("button", { class: "number btns", id: "six", onClick: this.numberPressed }, "6"),
      React.createElement("button", { class: "operator btns", id: "add", onClick: this.operatorPressed }, "+"),
      React.createElement("button", { class: "number btns", id: "one", onClick: this.numberPressed }, "1"),
      React.createElement("button", { class: "number btns", id: "two", onClick: this.numberPressed }, "2"),
      React.createElement("button", { class: "number btns", id: "three", onClick: this.numberPressed }, "3"),
      React.createElement("button", { class: "equals btns", id: "equals", onClick: this.equalsPressed }, "="),
      React.createElement("button", { class: "number btns", id: "zero", onClick: this.numberPressed }, "0"),
      React.createElement("button", { class: "decimal btns", id: "decimal", onClick: this.decimalPressed }, "."))),


      React.createElement("p", { class: "footer-text" }, "Designed and Coded By"),
      React.createElement("p", { class: "name" }, React.createElement("a", { href: "#" }, "Thiago Ramos C P"))));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));