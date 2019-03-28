import React, { Component } from "react";
import { toast } from "react-toastify";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getProductItems,
  deleteProductItem
} from "../../actions/productActions";

import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Products extends Component {
  componentDidMount() {
    this.props.getProductItems();
  }

  handleProductDetail = item => {
    this.props.history.push(`/Product/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deleteProductItem(item._id);
    toast.info(`${item.name} با موفقیت حذف شد.`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/EditProduct/${item._id}`);
  };

  // handleLikeItem = item => {
  //   const items = [...this.state.items];
  //   const index = items.indexOf(item);
  //   items[index].liked = !items[index].liked;
  //   this.setState({
  //     items
  //   });
  // };

  // handleTypesFilter = type => {
  //   this.setState({
  //     items:
  //       type.name && type.id
  //         ? getCustomerItems().filter(item => item.type == type.name)
  //         : getCustomerItems(),
  //     selectedGenre: type == "all" ? "all" : type.name,
  //     currentPage: 1
  //   });
  // };

  render() {
    const { products, loadingProducts, ...rest } = this.props;
    if (loadingProducts || !products) return <h1>Loading...</h1>;
    return (
      <ListPage
        items={products}
        onDetail={this.handleProductDetail}
        onEdit={this.handleEditTableItem}
        onDelete={this.handleDeleteTableItem}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  loadingProducts: state.product.loading
});

export default connect(
  mapStateToProps,
  { getProductItems, deleteProductItem }
)(withStyles(rtlStyle)(Products));
