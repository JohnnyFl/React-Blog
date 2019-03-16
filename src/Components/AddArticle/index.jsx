import React, { Component } from "react";
import RichEditor from "../TextArea/index";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { EditorState, convertFromRaw } from "draft-js";
import MomentUtils from "@date-io/moment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import green from "@material-ui/core/colors/green";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";

const mapStateToProps = ({
  articles: { previewText, postText, articles },
  categories: { categories }
}) => {
  return {
    previewText,
    postText,
    categories,
    articles
  };
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800]
    }
  },
  backButton: {
    margin: theme.spacing.unit,
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[800]
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: { useNextVariants: true }
});

class AddArticle extends Component {
  constructor(props) {
    super(props);
    const article = this.props.articles.filter(
      article => article.id === Number(this.props.id)
    );

    if (this.props.id) {
      this.state = {
        title: article[0].title,
        author: article[0].author,
        image: article[0].image,
        previewText: article[0].previewText,
        postText: article[0].postText,
        postDate: article[0].postDate,
        category: article[0].category,
        editorState: EditorState.createWithContent(
          convertFromRaw(article[0].postText)
        )
      };
    } else {
      this.state = this.props.state;
    }
  }

  onInputChange = event => {
    const target = event.target;
    this.setState({ [target.id]: target.value });
  };

  handleDateChange = event => {
    this.setState({ postDate: moment(event, "YYYY-MM-DD") });
  };

  handleSelectChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const {
      title,
      author,
      image,
      postDate,
      category,
      editorState
    } = this.state;
    const {
      buttonName,
      method,
      categories,
      classes,
      id,
      previewText,
      postText
    } = this.props;
    return (
      <form id="post" className={classes.container}>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="title"
            label="Title"
            defaultValue={title}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onInputChange}
          />
          <TextField
            id="author"
            label="Author"
            defaultValue={author}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onInputChange}
          />
          <TextField
            id="image"
            label="ImageURL"
            defaultValue={image}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onInputChange}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="pickers" style={{ margin: "auto 10px" }}>
              <DatePicker
                id="postDate"
                value={postDate}
                onChange={this.handleDateChange}
              />
            </div>
          </MuiPickersUtilsProvider>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Category
            </InputLabel>
            <Select
              value={category}
              autoWidth
              onChange={this.handleSelectChange}
              input={
                <OutlinedInput id="category" labelWidth={60} name="category" />
              }
            >
              {categories.map(category => (
                <MenuItem key={`${category.title}${category.id}`} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MuiThemeProvider>
        <RichEditor editorState={editorState} />
        <Link to="/posts" style={{ height: 50 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              method(
                image,
                title,
                previewText,
                postText,
                author,
                postDate,
                category,
                id
              );
            }}
          >
            {buttonName}
          </Button>
        </Link>
        <Link to="/posts" style={{ height: 50 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            Back
          </Button>
        </Link>
      </form>
    );
  }
}

AddArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

AddArticle.defaultProps = {
  state: {
    image: "",
    title: "",
    previewText: "",
    postText: "",
    author: "",
    postDate: moment(new Date(), "YYYY-MM-DD"),
    category: "Technics",
    editorState: EditorState.createEmpty()
  }
};

export default connect(mapStateToProps)(withStyles(styles)(AddArticle));
