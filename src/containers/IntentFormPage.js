import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import Dialog from "material-ui/Dialog"; // , { DialogActions, DialogContent, DialogContentText, DialogTitle}
import { grey400, grey200, grey500 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
// import {Card} from 'material-ui/Card';
import ActionDelete from "material-ui/svg-icons/action/delete";
import { getIntent, updateIntent, addIntent, newIntent } from "../actions/intent";
import { loadBots } from "../actions/bot";
import { loadProducts, loadCategories } from "../actions/product";
import { loadIntents } from "../actions/intent";

import { FormsyText, FormsySelect, FormsyDate } from "formsy-material-ui/lib"; // FormsyDate
import Formsy from "formsy-react";
import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import autoBind from "react-autobind";
import FloatingActionButton from "material-ui/FloatingActionButton";
let botName;
class IntentFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.nb ? true : false,
      categoryId: 0,
      responseTypeValue: "",
      product: null,
      open: false,
      intent: [{nb: ""}],
      name: '',
      shareholders: [{ name: '' }],
    };

    // autobind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
    // this.removeProduct = this.removeProduct.bind(this);
    // this.handleCategoryChange = this.handleCategoryChange.bind(this);
    // this.handleProductChange = this.handleProductChange.bind(this);
  }

  componentWillMount() {
    if (this.props.routeParams && this.props.routeParams.id) {
      this.props.getIntent(this.props.routeParams.id, this.props.routeParams.nb);
      this.props.getAllBots();
      this.props.getCategoryList();
    } else {
      this.props.newIntent();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.intent &&
        nextProps.intent &&
        this.props.intent.id != nextProps.intent.id) ||
      this.props.intent != nextProps.intent
    ) {
      this.setState({ isFetching: false });
      this.setState({ intent: Object.assign({}, nextProps.intent) });
    }

    if (nextProps.productList) {
      this.setState({ productList: Object.assign({}, nextProps.productList) });
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push("/bot/" + this.props.routeParams.nb + "/intents");
    }
  }

  disableButton() {
    if (this.state.intent.products <= 0) {
      this.setState({
        canSubmit: false
      });
    }
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event, action) {
    event.preventDefault();
    console.log(event);
    this.state.intent.response = {};
    this.state.intent.response.text = this.state.intent.text;
    this.state.intent.response.imageUrl = this.state.intent.imageUrl;
    this.state.intent.response.cardTitle = this.state.intent.cardTitle;
    this.state.intent.response.cardSubtitle = this.state.intent.cardSubtitle;
    this.state.intent.response.buttonTitle = this.state.intent.buttonTitle;
    this.state.intent.response.responseType = this.state.responseTypeValue;
    this.state.intent.response.title = this.state.intent.title;
    if (this.state.shareholders[0].name !== "") {
      this.state.shareholders.map((shareholder, idx) => (
        this.state.intent.response[`response${idx + 1}`] = shareholder.name
      )); 
    }
    
    delete this.state.intent.text;
    delete this.state.intent.Response;
    delete this.state.intent.imageUrl;
    delete this.state.intent.cardTitle;
    delete this.state.intent.cardSubtitle;
    delete this.state.intent.buttonTitle;
    delete this.state.intent.responseType;
    delete this.state.intent.title;
    if (action && action === "AddProduct") {
      this.setState({ open: true });
    } else {
      if (this.props.intentList[this.props.routeParams.id - 1].nb && this.props.intentList[this.props.routeParams.id - 1].id) {
        this.state.intent.id = this.props.intentList[this.props.routeParams.id - 1].id;
        this.state.intent.nb = this.props.intentList[this.props.routeParams.id - 1].nb;
        this.state.intent.botId = this.props.intentList[this.props.routeParams.id - 1].botId;
        if ( this.props.intentList[this.props.routeParams.id - 1].intentName) {
          this.state.intent.intentName = this.props.intentList[this.props.routeParams.id - 1].intentName;
        }
        this.props.updateIntent(this.state.intent);
      }
      else {
        this.state.intent.bot = this.props.botList[this.props.routeParams.nb - 1].name;
        this.state.intent.id = this.props.intentList[0] ? (parseInt(this.props.intentList[this.props.intentList.length - 1].id) + 1).toString() : "1";
        this.state.intent.nb = this.props.routeParams.nb;
        if (this.state.intent.id) {
          this.props.addIntent(this.state.intent);
        }
      }
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  handleChange(event, date) {
    const field = event ? event.target.name : null;
    const { intent } = this.state;

    if (intent) {
      if (typeof date === "object") {
        let intent = Object.assign({}, intent);
        intent.shippedDate = date.toLocaleDateString();
        this.setState({ intent: intent });
        this.enableButton();
      } else if (event && event.target && field) {
        let _intent = Object.assign({}, intent);
        _intent[field] = event.target.value;
        this.setState({ intent: _intent });
        _intent["bot"] = botName;
        this.setState({ intent: _intent });
        this.enableButton();
      }
    }
  }

  removeProduct(product) {
    if (product) {
      this.state.intent.products.splice(
        this.state.intent.products.indexOf(product),
        1
      );
      this.setState({ intent: this.state.intent });
      if (this.state.intent.products.length > 0) this.enableButton();
    }
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleOk() {
    const { intent } = this.state;

    intent.products = intent.products || [];
    intent.products.push(this.state.product);
    this.setState({ open: false });
    this.setState({ intent: this.state.intent });
    this.enableButton();
  }

  handleCategoryChange(event, index, values) {
    this.props.getProductList({
      categoryId: this.props.categoryList[values].id
    });
  }

  handleResponseChange(event, index, values) {
    this.setState({ responseTypeValue: index });
  }

  handleProductChange(event, index, values) {
    this.setState({ product: this.props.productList[values] });
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  }

  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    const {
      errorMessage,
      botList,
      intentList,
      categoryList,
      productList
    } = this.props;

    const { isFetching, intent } = this.state;

    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 0,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      deleteButton: {
        fill: grey500
      },
      buttons: {
        marginTop: 30,
        float: "right"
      },
      saveButton: {
        marginLeft: 5
      },
      card: {
        width: 120
      },
      productList: {
        color: "navy",
        paddingTop: 20,
        fontWeight: "bold"
      },
      productItem: {
        background: "lightblue",
        paddingLeft: 20
      },
      productDeleteIcon: {
        float: "right",
        marginTop: -30,
        paddingRight: 20
      },
      menuItem: {
        fontSize: 14
      },
      customWidth: {
        width: 250
      },
      dialog: {
        width: "20%",
        maxWidth: "none",
        minWidth: 300
      }
    };

    if (isFetching) {
      return <CircularProgress />;
    } else {
      if (botList && botList[this.props.routeParams.nb - 1])
        botName = botList[this.props.routeParams.nb - 1].name;
      let responseType = [{"text":"Text response", "id":0}, {"text":"Image", "id":1}, {"text":"Card", "id":2}, {"text":"Quick replies", "id":3}];
      
      return (
        <PageBase title={botName+" - Intent"} navigation="Application / Intent ">
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridTile>
                <FormsyText
                  hintText="Intent's name"
                  floatingLabelText="Intent's name"
                  name="intentName"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].intentName ? this.props.intentList[this.props.routeParams.id - 1].intentName : ""}
                  validationErrors={{
                    isWords: "Please provide valid intent name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>
              <GridTile>
                <FormsySelect
                  hintText="Response type"
                  floatingLabelText="Response type"
                  name="responseTypeValue"
                  onChange={this.handleResponseChange}
                  fullWidth={true}
                  value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].response.responseType ? this.props.intentList[this.props.routeParams.id - 1].response.responseType : ""}
                  style={styles.customWidth}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid response type name"
                  }}
                >
                  {
                    responseType.map((responsetype, index) => (
                    <MenuItem
                      key={index}
                      value={responsetype.text}
                      style={styles.menuItem}
                      primaryText={
                        responsetype.text
                      }
                    />
                  ))}
                </FormsySelect>
              </GridTile>
              {this.state.responseTypeValue === "Text response" && <GridTile>
                <FormsyText
                    hintText="Text"
                    floatingLabelText="Text"
                    name="text"
                    onChange={this.handleChange}
                    fullWidth={true}
                    value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].text ? this.props.intentList[this.props.routeParams.id - 1].text : ""}
                    validationErrors={{
                      isWords: "Please provide valid text name",
                      isDefaultRequiredValue: "This is a required field"
                    }}
                    required
                  />
              </GridTile>}
              {this.state.responseTypeValue === "Card" && <PageBase title="Card">
                <Formsy.Form
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  onValidSubmit={this.handleClick}
                  onInvalidSubmit={this.notifyFormError}
                >
                  <GridTile>
                    <FormsyText
                      hintText="Enter image URL"
                      floatingLabelText="Enter image URL"
                      name="imageUrl"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].imageUrl ? this.props.intentList[this.props.routeParams.id - 1].imageUrl : ""}
                      validationErrors={{
                        isWords: "Please provide valid image url name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                    />
                  </GridTile>
                  <GridTile>
                    <FormsyText
                      hintText="Enter card title"
                      floatingLabelText="Enter card title"
                      name="cardTitle"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].cardTitle ? this.props.intentList[this.props.routeParams.id - 1].cardTitle : ""}
                      validationErrors={{
                        isWords: "Please provide valid card title name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      required
                    />
                  </GridTile>
                  <GridTile>
                    <FormsyText
                      hintText="Enter card subtitle"
                      floatingLabelText="Enter card subtitle"
                      name="cardSubtitle"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].cardSubtitle ? this.props.intentList[this.props.routeParams.id - 1].cardSubtitle : ""}
                      validationErrors={{
                        isWords: "Please provide valid card subtitle name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                    />
                  </GridTile>
                  <GridTile>
                    <FormsyText
                      hintText="Enter button title"
                      floatingLabelText="Enter button title"
                      name="buttonTitle"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].buttonTitle ? this.props.intentList[this.props.routeParams.id - 1].buttonTitle : ""}
                      validationErrors={{
                        isWords: "Please provide valid button title name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                    />
                  </GridTile>
                </Formsy.Form>
              </PageBase>}
              {this.state.responseTypeValue === "Image" && <GridTile>
                    <FormsyText
                      hintText="Enter image URL"
                      floatingLabelText="Enter image URL"
                      name="imageUrl"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].imageUrl ? this.props.intentList[this.props.routeParams.id - 1].imageUrl : ""}
                      validationErrors={{
                        isWords: "Please provide valid image url name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      required
                    />
                  </GridTile>}
                  {this.state.responseTypeValue === "Quick replies" && <FormsyText
                      hintText="Enter title"
                      floatingLabelText="Enter title"
                      name="title"
                      onChange={this.handleChange}
                      fullWidth={true}
                      value={this.props.intentList && this.props.intentList[this.props.routeParams.id - 1] && this.props.intentList[this.props.routeParams.id - 1].title ? this.props.intentList[this.props.routeParams.id - 1].title : ""}
                      validationErrors={{
                        isWords: "Please provide valid title name",
                        isDefaultRequiredValue: "This is a required field"
                      }}
                      required
                    />}
              {this.state.responseTypeValue === "Quick replies" && this.state.shareholders.map((shareholder, idx) => (
                <GridTile>
                    <FormsyText
                      hintText="Enter new response"
                      floatingLabelText="Enter new response"
                      name={`response${idx + 1}`}
                      onChange={this.handleShareholderNameChange(idx)}
                      fullWidth={true}
                      value={shareholder.name ? shareholder.name : ""}
                    />
                    <FloatingActionButton
                      zDepth={0}
                      mini={true}
                      backgroundColor={grey200}
                      iconStyle={styles.deleteButton}
                      onClick={this.handleRemoveShareholder(idx)}>
                      <ActionDelete />
                    </FloatingActionButton>
              </GridTile>))}
                {this.state.responseTypeValue === "Quick replies" && <RaisedButton
                label="Add response"
                type="button"
                onClick={this.handleAddShareholder}
                primary={true}
              />}
              <div style={styles.buttons}>
              <Link to={"/bot/" + this.props.routeParams.nb + "/intents"}>
                <RaisedButton label="Cancel" />
              </Link>

              <RaisedButton
                label="Save"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event)}
                primary={true}
                disabled={!this.state.canSubmit}
              />
              <RaisedButton
                label="Add"
                style={styles.saveButton}
                type="button"
                onClick={() => this.handleClick(event, "AddProduct")}
                primary={true}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Dialog
              title="Add Product"
              open={this.state.open}
              contentStyle={styles.dialog}
              ignoreBackdropClick
              ignoreEscapeKeyUp
              maxWidth="xs"
            >
              <div>
                <FormsySelect
                  floatingLabelText="Categories"
                  // onChange={this.handleChange}
                  style={styles.customWidth}
                  name="categoryId"
                  onChange={this.handleCategoryChange}
                >
                  {categoryList.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={category.id}
                      style={styles.menuItem}
                      primaryText={category.categoryName}
                    />
                  ))}
                </FormsySelect>

                <FormsySelect
                  floatingLabelText="Products"
                  // onChange={this.handleChange}
                  style={styles.customWidth}
                  name="categoryId"
                  onChange={this.handleProductChange}
                >
                  {productList.map((product, index) => (
                    <MenuItem
                      key={index}
                      value={product.id}
                      style={styles.menuItem}
                      primaryText={product.productName}
                    />
                  ))}
                </FormsySelect>

                <span>
                  <RaisedButton onClick={this.handleCancel} color="primary">
                    Cancel
                  </RaisedButton>
                  <RaisedButton onClick={this.handleOk} color="primary">
                    Ok
                  </RaisedButton>
                </span>
              </div>
            </Dialog>
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

IntentFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  intent: PropTypes.object,
  newIntent: PropTypes.func.isRequired,
  getIntent: PropTypes.func.isRequired,
  updateIntent: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addIntent: PropTypes.func.isRequired,
  botList: PropTypes.array,
  intentList: PropTypes.array,
  categoryList: PropTypes.array,
  productList: PropTypes.array,
  getAllBots: PropTypes.func.isRequired,
  getAllIntents: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { botReducer, intentReducer, productReducer } = state;
  const { productList, categoryList } = productReducer;
  const { botList } = botReducer;
  const { intentList } = intentReducer;
  const {
    intent,
    isFetching,
    updateSuccess,
    addSuccess,
    isAuthenticated,
    user
  } = intentReducer;

  return {
    intent: intent || {},
    isFetching,
    botList,
    intentList,
    categoryList,
    productList,
    addSuccess,
    updateSuccess,
    isAuthenticated,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newIntent: () => dispatch(newIntent()),
    getIntent: (id, nb) => dispatch(getIntent(id, nb)),
    updateIntent: intent => dispatch(updateIntent(intent)),
    addIntent: intent => dispatch(addIntent(intent)),
    getCategoryList: () => dispatch(loadCategories()),
    getProductList: filters => dispatch(loadProducts(filters)),
    getAllBots: () => dispatch(loadBots()),
    getAllIntents: (filters, nb) => dispatch(loadIntents(filters, nb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentFormPage);