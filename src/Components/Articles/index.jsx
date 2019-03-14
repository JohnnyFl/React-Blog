import React, { Component } from "react";
import { deleteArticle } from "../../Actions/articlesActions";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import arraySort from "array-sort";
import moment from "moment";
import CardActionArea from "@material-ui/core/CardActionArea";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import green from "@material-ui/core/colors/green";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./index.sass";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800]
    }
  },
  buttonTitle: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  card: {
    maxWidth: 1000
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between"
  },
  media: {
    height: 270
  }
});

const mapDispatchToProps = {
  deleteArticle
};

class Articles extends Component {
  state = {
    isNewestFirst: false,
    isSortByAsc: false,
    data: this.props.articles,
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  //Make improvements

  sort = (articles, option) => {
    const { isNewestFirst, isSortByAsc } = this.state;
    if (!isNewestFirst) {
      this.setState(({ isNewestFirst }) => {
        return {
          data: arraySort(articles, option),
          isNewestFirst: !isNewestFirst
        };
      });
    } else if (isNewestFirst) {
      this.setState(({ isNewestFirst }) => {
        return {
          data: arraySort(articles, option, { reverse: true }),
          isNewestFirst: !isNewestFirst
        };
      });
    }
    if (!isSortByAsc) {
      this.setState(({ isSortByAsc }) => {
        return {
          data: arraySort(articles, option),
          isSortByAsc: !isSortByAsc
        };
      });
    } else if (isSortByAsc) {
      this.setState(({ isSortByAsc }) => {
        return {
          data: arraySort(articles, option, { reverse: true }),
          isSortByAsc: !isSortByAsc
        };
      });
    }
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.articles !== state.data) {
      return {
        data: props.articles
      };
    }
    return null;
  };

  render() {
    const { articles, deleteArticle, classes } = this.props;
    const { data } = this.state;
    return (
      <div>
        <div className="buttonWrapper">
          <div>
            <Link to="/post/new">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Article
              </Button>
            </Link>
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => this.sort(articles, "title")}
              className={classes.buttonTitle}
            >
              Sort By Title
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => this.sort(articles, "postDate")}
              className={classes.buttonTitle}
            >
              Sort By Date
            </Button>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {data.map(article => (
              <Grid item xs={4} key={`${article.title}${article.id}`}>
                <Card className={classes.card}>
                  <Link to={`/posts/${article.id}`}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={article.image}
                        title={article.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {article.title}
                        </Typography>
                        <Typography component="p">
                          {article.previewText.slice(0, 135)}
                          ...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <Link to={`post/${article.id}`}>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </Link>
                    <Link to="/posts">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => deleteArticle(article.id)}
                      >
                        Delete
                      </Button>
                    </Link>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography>{article.author}</Typography>
                      <Typography>
                        {moment(article.postDate).format("L")}
                      </Typography>
                      <Typography>{article.category}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Articles))
);
