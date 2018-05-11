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
import ActionFace from "material-ui/svg-icons/action/face";
import ContentAdd from "material-ui/svg-icons/content/add";
import Search from "material-ui/svg-icons/action/search";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import Cancel from "material-ui/svg-icons/navigation/cancel";
import {
  pink500,
  grey200,
  grey500,
  green400,
  orange400,
  white
} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
// import Data from '../data';
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { loadBots, deleteBot } from "../actions/bot";
import { loadIntents } from "../actions/intent";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

class BotListPage extends React.Component {
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
      botId: null,
      dialogText: "Are you sure to do this?",
      search: {
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

    if (this.props.botList || this.props.botList.length < 1)
      props.getAllBots(this.state.search);
  }

  componentWillMount() {
    this.props.getAllIntents();
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.botList !== prevProps.botList) {
      this.onChangePage(this.props.botList.slice(0, 5));
    }
  }

  onChangePage(pageOfItems) {
    if (
      !this.props.isFetching &&
      this.state.pageOfItems &&
      this.props.botList
    )
      this.setState({ pageOfItems: pageOfItems });
  }

  onDelete(id) {
    if (id) {
      this.handleOpen(id);
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  handleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.getAllBots(this.state.search);
  }

  handleOpen(id) {
    this.setState({ dialogText: "Are you sure to delete this data?" });
    this.setState({ open: true });
    this.setState({ botId: id });
  }

  handleClose(isConfirmed) {
    this.setState({ open: false });

    if (isConfirmed && this.state.botId) {
      this.props.deleteBot(this.state.botId);
      this.setState({ botId: null });
    }
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
      this.props.getAllBots();
    }
  }

  render() {
    const {
      errorMessage,
      botList,
      intentList,
      deleteSuccess,
      isFetching
    } = this.props;

    //  if ( deleteSuccess && !isFetching){
    //        this.props.getAllBots();
    //  }
    //  else if (!deleteSuccess && errorMessage){
    //    this.handleErrorMessage ();
    //  }

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
        paddingRight: 5
      },
      faceButton: {
        paddingRight: 25
      },
      editButtonIcon: {
        fill: white
      },
      deleteButton: {
        fill: grey500
      },
      columns: {
        name: {
          width: "30%"
        },
        description: {
          width: "30%"
        },
        nameTag: {
          width: "7%"
        },
        descriptionTag: {
          width: "10%"
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
    ]
    
    return (
      <PageBase
        title={"Bots (" + botList.length + ")"}
        navigation="Reetek React CRM / Bot"
      >
        <div>
          <div>
            <Link to="/bot">
              <FloatingActionButton
                backgroundColor="lightblue"
                secondary={true}
                style={styles.fab}
                backgroundColor={pink500}
              >
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
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
                <TableHeaderColumn style={styles.columns.nameTag}/>
                <TableHeaderColumn style={styles.columns.nameTag}>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.descriptionTag}>
                  Description
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.state.pageOfItems.map(item => (
                // +"/intent/"+ intentList.filter(intent => intent.bot === botList[item.id - 1].name).length
                <TableRow key={item.id}>
                <Link className="button" to={"/bot/" + item.id + "/intents"}>
                    <FloatingActionButton
                      zDepth={0}
                      mini={true}
                      style={styles.faceButton}
                      backgroundColor={orange400}
                      iconStyle={styles.editButtonIcon}
                    >
                      <ActionFace/>
                    </FloatingActionButton>
                  </Link>
                  <TableRowColumn style={styles.columns.name}>
                    <img width={40} src={item.avatar} />
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>
                    {item.name}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.description}>
                    {item.description}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={"/bot/" + item.id}>
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
                <Pagination
                  items={botList}
                  onChangePage={this.onChangePage}
                />
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
              hintText="First Name"
              floatingLabelText="First Name"
              name="name"
              fullWidth={true}
              value={this.state.search.name}
              onChange={this.handleSearchFilter}
            />

            <TextField
              hintText="Last Name"
              floatingLabelText="Last Name"
              fullWidth={true}
              name="timezone"
              value={this.state.search.timezone}
              onChange={this.handleSearchFilter}
            />
          </Drawer>
        </div>
      </PageBase>
    );
  }
}

BotListPage.propTypes = {
  isFetching: PropTypes.bool,
  botList: PropTypes.array,
  intentList: PropTypes.array,
  getAllBots: PropTypes.func.isRequired,
  deleteBot: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  getAllIntents: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { botReducer, intentReducer } = state;
  const {
    botList,
    isFetching,
    deleteSuccess,
    isAuthenticated,
    errorMessage,
    user
  } = botReducer;
  const { intentList } = intentReducer;

  return {
    botList,
    intentList,
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
    getAllIntents: (filters, nb) => dispatch(loadIntents(filters, nb)),
    deleteBot: id => dispatch(deleteBot(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BotListPage);
