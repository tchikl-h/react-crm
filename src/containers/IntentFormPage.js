import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import Dialog from "material-ui/Dialog"; // , { DialogActions, DialogContent, DialogContentText, DialogTitle}
import { grey400 } from "material-ui/styles/colors";
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

import { FormsyText, FormsySelect, FormsyDate } from "formsy-material-ui/lib"; // FormsyDate
import Formsy from "formsy-react";
import MenuItem from "material-ui/MenuItem";
import CircularProgress from "material-ui/CircularProgress";
import autoBind from "react-autobind";
let botName;
class IntentFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      categoryId: 0,
      product: null,
      open: false,
      intent: {}
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
      this.props.getIntent(this.props.routeParams.id);
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
      this.props.router.push("/intents");
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
    if (action && action === "AddProduct") {
      this.setState({ open: true });
    } else {
      if (this.state.intent.id) {
        this.props.updateIntent(this.state.intent);
      }
      else {
        this.props.addIntent(this.state.intent);
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

  handleProductChange(event, index, values) {
    this.setState({ product: this.props.productList[values] });
  }

  render() {
    const {
      errorMessage,
      botList,
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
      botName = botList[window.location.href.split("/")[4] - 1].name;
      return (
        <PageBase title={botName+" - Intent"} navigation="Application / Intent ">
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cols={3} cellHeight={60}>
            <GridTile>
                <FormsyText
                  hintText="Intent's name"
                  floatingLabelText="Intent's name"
                  name="intentName"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={intent.intentName ? intent.intentName : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid intent name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>
              <GridTile>
                <FormsyText
                  hintText="Response"
                  floatingLabelText="Response"
                  name="response"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={intent.response ? intent.response : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid response name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />
              </GridTile>
            </GridList>

            <div style={styles.buttons}>
              <Link to="/intents">
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
  categoryList: PropTypes.array,
  productList: PropTypes.array,
  getAllBots: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { botReducer, intentReducer, productReducer } = state;
  const { productList, categoryList } = productReducer;
  const { botList } = botReducer;
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
    getIntent: id => dispatch(getIntent(id)),
    updateIntent: intent => dispatch(updateIntent(intent)),
    addIntent: intent => dispatch(addIntent(intent)),
    getCategoryList: () => dispatch(loadCategories()),
    getProductList: filters => dispatch(loadProducts(filters)),
    getAllBots: () => dispatch(loadBots())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentFormPage);