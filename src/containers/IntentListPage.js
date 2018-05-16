import React, { PropTypes } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentCreate from "material-ui/svg-icons/content/create";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentAdd from "material-ui/svg-icons/content/add";
import Search from "material-ui/svg-icons/action/search";
import {
  pink500,
  grey200,
  grey500,
  green400,
  white
} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
// import Data from '../data';
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { loadIntents, deleteIntent } from "../actions/intent";
import { loadBots } from "../actions/bot";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
// import { View, Text, Image } from 'react-native'
import Card from 'material-ui/Card'

class IntentListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchOpen: false,
      snackbarOpen: false,
      autoHideDuration: 1500,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      pageOfItems: [],
      currentPage: -1,
      nbPage: 0,
      intentNb: null,
      dialogText: "Are you sure to do this?",
      search: {
        intent: {
          intentName: ""
        }
      },
      searchBot: {
        name: ""
      }
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);

    if (this.props.intentList || this.props.intentList.length < 1)
      props.getAllIntents(this.state.search, this.props.routeParams.nb);
    if (this.props.botList || this.props.botList.length < 1)
      props.getAllIntents(this.state.search, this.props.routeParams.nb);
  }

  componentWillMount() {
    this.props.getAllBots();
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has change
    if (this.props.intentList !== prevProps.intentList) {
      // this.setState({ nbPage: this.state.nbPage + 1 });
      //this.setPage(this.props.initialPage);
      this.onChangePage(this.props.intentList.slice(0, 5), -1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.errorMessage && !nextProps.deleteSuccess) {
      this.setState({ snackbarOpen: true });
    }

    if (
      !this.props.deleteSuccess &&
      nextProps.deleteSuccess &&
      !nextProps.errorMessage &&
      !nextProps.isFetching
    ) {
      this.props.getAllIntents(this.state.search, this.props.routeParams.nb);
    }
  }

  onChangePage(pageOfItems, currentPage) {
    if (currentPage !== -1) {
      this.setState({currentPage: currentPage});
    }
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.intentList
    )
      this.setState({ pageOfItems: pageOfItems });
  }

  onDelete(nb) {
    if (nb) {
      this.handleOpen(nb);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllIntents(this.state.search, this.props.routeParams.nb);
  }

  handleOpen(nb) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ intentNb: nb });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.intentNb) {
      this.props.deleteIntent(this.state.intentNb, this.props.routeParams.nb);
      this.setState({ intentNb: null });
    }
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllIntents(this.state.search, this.props.routeParams.nb);
  }

  handleSearchFilter(event) {
    const field = event.target.name;

    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search[field] = event.target.value;

      this.setState({ search: search });
    }
  }

  handleErrorMessage() {
    this.setState({
      snackbarOpen: true
    });
  }

  handleSnackBarClose() {
    this.setState({
      snackbarOpen: false
    });
  }

  render() {
    const { errorMessage, intentList, botList } = this.props;

    const styles = {
      fab: {
        // margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20
      },
      fabSearch: {
        // margin: 0,
        top: "auto",
        right: 100,
        bottom: 20,
        left: "auto",
        position: "fixed",
        marginRight: 20,
        backgroundColor: "lightblue"
      },
      editButton: {
        paddingRight: 25
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: "10%"
        },
        name: {
          width: "40%"
        },
        bot: {
          width: "20%"
        },
        intentName: {
          width: "20%"
        },
        responseType: {
          width: "20%"
        },
        response: {
          width: "20%"
        },
        intentNameTag: {
          width: "20%"
        },
        responseTypeTag: {
          width: "25%"
        },
        responseTag: {
          width: "30%"
        },
        price: {
          width: "20%",
          textAlign: "right"
        },
        category: {
          width: "20%"
        },
        edit: {
          width: "10%"
        }
      },
      dialog: {
        width: "20%",
        maxWidth: "none"
      },
      drawer: {
        backgroundColor: "lightgrey"
      }
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        value={false}
        onTouchTap={() => this.handleClose(false)}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        value={true}
        onTouchTap={() => this.handleClose(true)}
      />
    ];
    return (
      <PageBase
        title={"Intents (" + intentList.filter(item => botList && botList[this.props.routeParams.nb - 1] && item.bot === botList[this.props.routeParams.nb - 1].name).length + ")"}
        navigation="Reetek React CRM / Intent"
      >
        <div>
          <Link to={"/bot/"+this.props.routeParams.nb+"/intent"}>
            <FloatingActionButton style={styles.fab} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <FloatingActionButton
            style={styles.fabSearch}
            backgroundColor={pink500}
            onTouchTap={this.handleToggle}
          >
            <Search />
          </FloatingActionButton>

          <Snackbar
            open={this.state.snackbarOpen}
            message={errorMessage ? errorMessage : ""}
            autoHideDuration={this.state.autoHideDuration}
            onRequestClose={this.handleSnackBarClose}
          />

          <Table
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn style={styles.columns.bot}>
                  Bot
                </TableHeaderColumn>
                {/*<TableHeaderColumn style={styles.columns.name}>Price</TableHeaderColumn>*/}
                <TableHeaderColumn style={styles.columns.intentNameTag}>
                  Intent's name
                </TableHeaderColumn>
                {/*<TableHeaderColumn style={styles.columns.category}>Status</TableHeaderColumn>*/}
                <TableHeaderColumn style={styles.columns.responseTypeTag}>
                  Response type
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.responseTag}>
                  Response
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.state.pageOfItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.bot}>
                    {item.bot}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.intentName}>
                    {item.intentName}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.responseType}>
                    {item.response.responseType}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.response}>
                    {item.response.text || item.response.imageUrl && <div><img src={ item.response.imageUrl} style={{width: 100, height: 100}}/></div> || item.response.title}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={"/bot/"+item.nb+"/intent/"+((this.state.currentPage - 1) * 5 + index + 1)}>
                      <FloatingActionButton
                        zDepth={0}
                        mini={true}
                        style={styles.editButton}
                        backgroundColor={green400}
                        iconStyle={styles.editButtonIcon}
                      >
                        <ContentCreate />
                      </FloatingActionButton>
                    </Link>

                    <FloatingActionButton
                      zDepth={0}
                      mini={true}
                      backgroundColor={grey200}
                      iconStyle={styles.deleteButton}
                      onTouchTap={() => this.onDelete(item.id)}
                    >
                      <ActionDelete />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={"row center-xs"}>
            <div className={"col-xs-6"}>
              <div className={"box"}>
                {intentList && (
                  <Pagination
                    items={intentList}
                    onChangePage={this.onChangePage}
                  />
                )}
              </div>
            </div>
          </div>
          <Dialog
            title="Confirm Dialog "
            actions={actions}
            modal={true}
            contentStyle={styles.dialog}
            open={this.state.open}
          >
            {this.state.dialogText}
          </Dialog>

          <Drawer
            width={300}
            openSecondary={true}
            open={this.state.searchOpen}
            containerStyle={styles.drawer}
          >
            {/*<AppBar title="AppBar" />*/}
            <RaisedButton
              label="Search"
              style={styles.saveButton}
              type="button"
              onClick={this.handleSearch}
              secondary={true}
            />

            <TextField
              hintText="Intent's name"
              floatingLabelText="Intent's name"
              name="intentName"
              fullWidth={true}
              value={this.state.search.intentName}
              onChange={this.handleSearchFilter}
            />
          </Drawer>
        </div>
      </PageBase>
    );
  }
}

IntentListPage.propTypes = {
  intentList: PropTypes.array,
  getAllIntents: PropTypes.func.isRequired,
  botList: PropTypes.array,
  getAllBots: PropTypes.func.isRequired,
  deleteIntent: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { intentReducer, botReducer} = state;
  const {
    intentList,
    deleteSuccess,
    isFetching,
    isAuthenticated,
    errorMessage,
    user
  } = intentReducer;
  const { botList } = botReducer;

  return {
    intentList,
    botList,
    isFetching,
    isAuthenticated,
    errorMessage,
    deleteSuccess,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBots: filters => dispatch(loadBots(filters)),
    getAllIntents: (filters, nb) => dispatch(loadIntents(filters, nb, true)),
    deleteIntent: (id, nb) => dispatch(deleteIntent(id, nb))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentListPage);