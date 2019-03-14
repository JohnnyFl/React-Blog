import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, CardActionArea } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import { stateToHTML } from "draft-js-export-html";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { convertFromRaw } from "draft-js";
import { connect } from "react-redux";

const mapStateToProps = ({ articles: { articles } }) => {
  return {
    articles
  };
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center"
  },
  typography: {
    textAlign: "center",
    marginBottom: 30
  },
  media: {
    height: "80vh"
  },
  backButton: {
    margin: theme.spacing.unit,
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[800]
    }
  }
});

const OpenArticle = props => {
  const { classes, id, articles } = props;
  const article = articles.filter(article => article.id === Number(id));
  const content = stateToHTML(convertFromRaw(article[0].postText));

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.typography}>
        {article[0].title}
      </Typography>
      <Grid container spacing={24} className={classes.gridContainer}>
        <Grid item xs={8}>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={article[0].image}
                title={article[0].title}
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography dangerouslySetInnerHTML={{ __html: content }} />
        </Grid>
      </Grid>
      <Link to="/posts" style={{ height: 50 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.backButton}
        >
          Back
        </Button>
      </Link>
    </div>
  );
};

OpenArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(OpenArticle));
