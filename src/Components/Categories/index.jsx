import React, { Component } from "react";
import {
  addCategory,
  updateCategory,
  deleteCategory
} from "../../Actions/categoryActions";
import { connect } from "react-redux";
import "./index.sass";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import blue from "@material-ui/core/colors/blue";
import EditIcon from "@material-ui/icons/Edit";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  table: {
    minWidth: 700
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  buttonEdit: {
    margin: theme.spacing.unit,
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800]
    }
  },
  buttonDelete: {
    margin: theme.spacing.unit,
    backgroundColor: red[600],
    "&:hover": {
      backgroundColor: red[800]
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: { useNextVariants: true }
});

const mapStateToProps = ({ categories: { categories } }) => {
  return {
    categories
  };
};

const mapDispatchToProps = {
  addCategory,
  updateCategory,
  deleteCategory
};

class Categories extends Component {
  state = {
    buttonName: "Add New",
    categoryName: "",
    isEdit: false,
    index: ""
  };

  onChange = event => {
    this.setState({ categoryName: event.target.value });
  };

  onEdit = index => {
    const { categories } = this.props;
    const selectedCategory = categories.filter(
      category => category.id === index
    );
    this.setState({
      categoryName: selectedCategory[0].name,
      buttonName: "Update Category",
      isEdit: true,
      index
    });
  };

  onUpdate = () => {
    const { updateCategory } = this.props;
    const { categoryName, index } = this.state;
    updateCategory(categoryName, index);
    this.setState({ categoryName: "", buttonName: "Add New", isEdit: false });
  };

  onAdd = () => {
    const { addCategory } = this.props;
    const { categoryName } = this.state;
    addCategory(categoryName);
    this.setState({ categoryName: "", buttonName: "Add New", isEdit: false });
  };

  onDelete = index => {
    const { deleteCategory } = this.props;
    deleteCategory(index);
  };

  render() {
    const { categories, classes } = this.props;
    const { buttonName, categoryName, isEdit } = this.state;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => this.onEdit(category.id)}
                      variant="contained"
                      color="primary"
                      className={classes.buttonEdit}
                      size="small"
                    >
                      Edit
                      <EditIcon className={classes.rightIcon} />
                    </Button>
                    <Button
                      onClick={() => this.onDelete(category.id)}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      size="small"
                    >
                      Delete
                      <DeleteIcon className={classes.rightIcon} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <form className={classes.container} noValidate autoComplete="off">
          <MuiThemeProvider theme={theme}>
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={categoryName}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <Button
              onClick={!isEdit ? this.onAdd : this.onUpdate}
              variant="contained"
              color="primary"
              className={classes.button}
              size="medium"
            >
              {buttonName}
            </Button>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Categories));
