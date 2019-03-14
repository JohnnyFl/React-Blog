import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { addSearchText } from "../../Actions/articlesActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import SideNav from "../Sidenav";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 75
  },
  toolbar: {
    minHeight: 55
  },
  appBar: {
    backgroundColor: "#2196F3"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    fontSize: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

const mapDispatchToProps = {
  addSearchText
};

class Header extends Component {
  state = {
    searchField: ""
  };

  onSearchChange = event => {
    this.setState({ searchField: event.target.value }, () => {
      const { searchField } = this.state;
      const { addSearchText } = this.props;
      addSearchText(searchField);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <SideNav />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Lightning
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={this.onSearchChange}
                value={this.state.searchField}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Header));
