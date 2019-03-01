import React, { Component } from "react";
import { addCategory, updateCategory, deleteCategory } from "./actions";
import { connect } from "react-redux";
import "./index.sass";

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories
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
    this.setState({
      categoryName: categories[index],
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
    const { categories } = this.props;
    const { buttonName, categoryName, isEdit } = this.state;
    return (
      <div className="wrapperForCategories">
        <div>
          <input
            type="text"
            placeholder="category..."
            id="category"
            value={categoryName}
            onChange={this.onChange}
          />
          <br />
          <button onClick={!isEdit ? this.onAdd : this.onUpdate}>
            {buttonName}
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <th>{category}</th>
                  <th>
                    <button onClick={() => this.onEdit(index)}>Edit</button>
                    <button onClick={() => this.onDelete(index)}>Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
