import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../services/authService";
import { connect } from "react-redux";
import {
  getProductItem,
  deleteProductItem
} from "../../actions/productActions";
import { PersianNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class Product extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductItem(id);
  }

  onDelete = item => {
    this.props.deleteProductItem(item._id);
    this.props.history.push("/Products");
    toast.info(`${item.name} با موفقیت حذف شد.`);
  };

  onEdit = item => {
    this.props.history.push(`/EditProduct/${item._id}`);
  };

  onProcess = item => {
    this.props.history.push(`/Process/${item._id}`);
  };

  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };

  render() {
    const user = auth.getCurrentUser();
    const { product, loading } = this.props;
    if (loading || !product) return <h1>Loading ...</h1>;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={this.props.classes.cardTitleWhite}>جزئیات محصول</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              جزئیات {product.name}
            </p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row m-2">
                <button
                  className="btn btn-lg btn-info m-2 shadow rounded"
                  onClick={this.handleBack}
                >
                  <i className="fa fa-arrow-right" />
                </button>

                <button
                  className="btn btn-lg btn-success m-2 shadow rounded"
                  style={{ backgroundColor: "#9c27b0", borderColor: "#9c27b0" }}
                  onClick={() => this.onProcess(product)}
                >
                  <i className="fa fa-sync" />
                </button>

                <button
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  onClick={() => this.onEdit(product)}
                >
                  <i className="fa fa-wrench" />
                </button>
                {user.isAdmin && (
                  <button
                    className="btn btn-lg btn-danger m-2 shadow rounded"
                    onClick={() => {
                      this.onDelete(product);
                    }}
                  >
                    <i className="fa fa-trash-alt" />
                  </button>
                )}
              </div>
              <div className="row">
                <div className="m-2 col-6">
                  <img
                    style={{
                      height: "500px",
                      width: "500px",
                      borderRadius: "10px"
                    }}
                    src={require(`../../${product.img}`)}
                  />
                  <br />
                  {product.imgs.map(img => (
                    <img
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        borderRadius: "5px"
                      }}
                      className="shadow rounded m-2"
                      src={require(`../../${img}`)}
                    />
                  ))}
                </div>
                <div className="list-group m-2 mt-5 col-5">
                  <div className="row shadow rounded">
                    <ListGroupItem
                      label="عنوان"
                      value={product.name}
                      size="12"
                      float=""
                    />
                    <ListGroupItem
                      label="دسته بندی"
                      value={product.category}
                      size="12"
                      float=""
                    />
                    <ListGroupItem
                      label="برند"
                      value={product.brand}
                      size="12"
                      float=""
                    />
                    <ListGroupItem label="کد محصول" value={product.proCode} />
                    <ListGroupItem
                      label="کد تنوع"
                      value={parseInt(product.diverseCode)}
                    />
                    <ListGroupItem
                      label="قیمت لیست"
                      value={parseInt(product.tradeListPrice)}
                    />
                    <ListGroupItem
                      label="قیمت خرید"
                      value={parseInt(product.tradeBuyingPrice)}
                    />
                    <ListGroupItem
                      label="قیمت عمده فروشی"
                      value={parseInt(product.wholePrice)}
                    />
                    <ListGroupItem
                      label="قیمت خرده فروشی"
                      value={parseInt(product.retailPrice)}
                    />
                    <ListGroupItem
                      label="قیمت مارکت پلیس"
                      value={parseInt(product.marketPlacePrice)}
                    />
                    <ListGroupItem
                      label="تعداد در جعبه"
                      value={parseInt(product.boxQuantity)}
                    />
                    <ListGroupItem
                      label="موجودی انبار خرده فروشی"
                      value={parseInt(product.retailStoreStock)}
                    />
                    <ListGroupItem
                      label="موجودی انبار عمده فروشی"
                      value={parseInt(product.wholeStoreStock)}
                    />
                    <ListGroupItem
                      label="موجودی انبار مارکت پلیس"
                      value={parseInt(product.wholeStoreStock)}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  loading: state.product.loading
});

export default connect(
  mapStateToProps,
  { getProductItem, deleteProductItem }
)(withStyles(rtlStyle)(Product));
