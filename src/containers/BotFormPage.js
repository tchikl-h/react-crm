import React, { PropTypes } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
// import DatePicker from 'material-ui/DatePicker';
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";

import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
import { Card } from "material-ui/Card";
import CircularProgress from "material-ui/CircularProgress";
import TimezonePicker from 'react-timezone';

import {
  getBot,
  updateBot,
  addBot,
  newBot
} from "../actions/bot";
import { FormsyText } from "formsy-material-ui/lib";
import Formsy from "formsy-react";
import autoBind from "react-autobind";
import BotListPage from "./BotListPage";

class BotFormPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFetching: this.props.routeParams.id ? true : false,
      bot: {}
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.notifyFormError = this.notifyFormError.bind(this);
    // this.disableButton = this.disableButton.bind(this);
  }

  componentWillMount() {
    if (this.props.routeParams.id)
      this.props.getBot(this.props.routeParams.id);
    else this.props.newBot();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.bot &&
      nextProps.bot &&
      this.props.bot.id != nextProps.bot.id
    ) {
      this.setState({ isFetching: false });
      this.setState({ bot: Object.assign({}, nextProps.bot) });
    }

    if (
      (!this.props.addSuccess && nextProps.addSuccess) ||
      (!this.props.updateSuccess && nextProps.updateSuccess)
    ) {
      this.props.router.push("/bots");
    }
  }

  handleChange(event) {
    const field = event.target.name;
    // const { bot } = this.state;

    if (event && event.target && field) {
      const bot = Object.assign({}, this.state.bot);
      bot[field] = event.target.value;
      this.setState({ bot: bot });
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  notifyFormError(data) {
    console.error("Form error:", data);
  }

  handleClick(event) {
    event.preventDefault();
    if (this.props.botList[this.props.routeParams.nb - 1]) {
      this.state.bot.id = this.props.botList[this.props.routeParams.nb - 1].id;
      if (!this.state.bot.name) {
        this.state.bot.name = this.props.botList[this.props.routeParams.nb - 1].name;
      }
      if (!this.state.bot.description) {
        this.state.bot.description = this.props.botList[this.props.routeParams.nb - 1].description;
      }
      this.props.updateBot(this.state.bot);
    }
    else this.props.addBot(this.state.bot);
  }

  render() {
    const { errorMessage, botList } = this.props;

    const { isFetching, bot } = this.state;

    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
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
      }
    };
    if (isFetching) {
      return <CircularProgress />;
    } else {
      return (
        <PageBase title="Bot" navigation="Application / Bot ">
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.handleClick}
            onInvalidSubmit={this.notifyFormError}
          >
            <GridList cellHeight={200}>
              <GridTile>
                <FormsyText
                  hintText="Name"
                  floatingLabelText="Name"
                  name="name"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={this.props.botList && this.props.botList[this.props.routeParams.nb - 1] && this.props.botList[this.props.routeParams.nb - 1].name ? this.props.botList[this.props.routeParams.nb - 1].name : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid name",
                    isDefaultRequiredValue: "This is a required field"
                  }}
                  required
                />

                <FormsyText
                  hintText="Description"
                  floatingLabelText="Description"
                  name="description"
                  onChange={this.handleChange}
                  fullWidth={true}
                  value={this.props.botList && this.props.botList[this.props.routeParams.nb - 1] && this.props.botList[this.props.routeParams.nb - 1].description ? this.props.botList[this.props.routeParams.nb - 1].description : ""}
                  validations={{
                    isWords: true
                  }}
                  validationErrors={{
                    isWords: "Please provide valid description"
                  }}
                />
                 
                {/* TODO: Cannot change timezone */}
                <TimezonePicker
                  defaultValue="Europe/Belgrade"
                  onChange={timezone => console.log('New Timezone Selected:', timezone)}
                  inputProps={{
                    placeholder: 'Select Timezone...',
                    name: 'timezone',
                  }}
                />

              </GridTile>

              <GridTile>
                {this.state.bot &&
                  bot.avatar && (
                    <Card style={styles.card}>
                      <img width={100} src={bot.avatar} />
                    </Card>
                  )}
              </GridTile>
            </GridList>
            <Divider />

            <div style={styles.buttons}>
              <Link to="/bots">
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
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Formsy.Form>
        </PageBase>
      );
    }
  }
}

BotFormPage.propTypes = {
  router: PropTypes.object,
  routeParams: PropTypes.object,
  bot: PropTypes.object,
  newBot: PropTypes.func.isRequired,
  getBot: PropTypes.func.isRequired,
  updateBot: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addBot: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  botList: PropTypes.array
};

function mapStateToProps(state) {
  const { botReducer } = state;
  const {
    bot,
    isFetching,
    updateSuccess,
    addSuccess,
    errorMessage,
    isAuthenticated,
    user,
    botList
  } = botReducer;

  return {
    bot: bot || {},
    isFetching,
    addSuccess,
    updateSuccess,
    errorMessage,
    isAuthenticated,
    user,
    botList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newBot: () => dispatch(newBot()),
    getBot: id => dispatch(getBot(id)),
    updateBot: bot => dispatch(updateBot(bot)),
    addBot: bot => dispatch(addBot(bot))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BotFormPage);
