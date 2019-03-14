import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Category from "@material-ui/icons/TurnedInNot";
import Categories from "@material-ui/icons/Bookmarks";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Home from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import "./index.sass";

const mapStateToProps = ({ categories: { categories } }) => {
  return {
    categories
  };
};

const styles = {
  list: {
    width: 250
  }
};

class Menu extends Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes, categories } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <Link to="/posts">
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>

          {categories.map(category => (
            <Link to={`/${category.name.toLowerCase()}`} key={category.id}>
              <ListItem button>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link to="/categories">
            <ListItem button>
              <ListItemIcon>
                <Categories />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer("left", true)} />
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Menu));
