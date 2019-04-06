import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../../services/authService";
import Form from "../form/form";
import Input from "../form/input";
import { getProductItem } from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import { getDigiKalaShipping } from "../../handlers/digikala";
import {
  getProfitByPercent,
  getProfitByPrice,
  getPercentByProfit,
  getPercentByPrice,
  getPriceByPercent,
  getPriceByProfit,
  getPercent,
  getDiffPrice
} from "../../handlers/profit";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Process extends Component {
  state = {
    data: {
      wholePrice: "",
      wholeProfitPercent: "",
      wholeProfitDiffPrice: "",
      marketPlacePrice: "",
      marketPlaceProfitPercent: "",
      marketPlaceProfitDiffPrice: ""
    }
  };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getProductItem(id);
    this.props.getSettingItems();
  };

  handleMarketPlaceProfitChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.marketPlaceProfitDiffPrice = getProfitByPercent(
        this.props.product.tradeBuyingPrice,
        value
      );
      data.marketPlacePrice =
        getPriceByPercent(this.props.product.tradeBuyingPrice, value) +
        this.getMarketPlaceCosts() +
        this.getAddedValue();
    } else if (value && e.target.name.includes("Profit")) {
      data.marketPlaceProfitPercent = getPercentByProfit(
        this.props.product.tradeBuyingPrice,
        value
      );
      data.marketPlacePrice =
        getPriceByProfit(this.props.product.tradeBuyingPrice, value) +
        this.getMarketPlaceCosts() +
        this.getAddedValue();
    } else if (value && e.target.name.includes("Price")) {
      data.marketPlaceProfitPercent = getPercentByPrice(
        this.props.product.tradeBuyingPrice,
        value - this.getMarketPlaceCosts() - this.getAddedValue()
      );
      data.marketPlaceProfitDiffPrice = getProfitByPrice(
        this.props.product.tradeBuyingPrice,
        value - this.getMarketPlaceCosts() - this.getAddedValue()
      );
    } else {
      data.marketPlaceProfitPercent = "";
      data.marketPlaceProfitDiffPrice = "";
      data.marketPlacePrice = "";
    }
    this.setState({ data });
  };

  handleProfitChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.wholeProfitDiffPrice = getProfitByPercent(
        this.props.product.tradeBuyingPrice,
        value
      );
      data.wholePrice =
        getPriceByPercent(this.props.product.tradeBuyingPrice, value) +
        this.getCostAndTax();
    } else if (value && e.target.name.includes("Profit")) {
      data.wholeProfitPercent = getPercentByProfit(
        this.props.product.tradeBuyingPrice,
        value
      );
      data.wholePrice =
        getPriceByProfit(this.props.product.tradeBuyingPrice, value) +
        this.getCostAndTax();
    } else if (value && e.target.name.includes("Price")) {
      data.wholeProfitPercent = getPercentByPrice(
        this.props.product.tradeBuyingPrice,
        value - this.getCostAndTax()
      );
      data.wholeProfitDiffPrice = getProfitByPrice(
        this.props.product.tradeBuyingPrice,
        value - this.getCostAndTax()
      );
    } else {
      data.wholeProfitPercent = "";
      data.wholeProfitDiffPrice = "";
      data.wholePrice = "";
    }
    this.setState({ data });
  };

  onEdit = item => {
    this.props.history.push(`/EditProduct/${item._id}`);
  };

  handleBack = () => {
    const { id } = this.props.match.params;
    this.props.onRoute(`/Product/${id}`);
    this.props.history.push(`/Product/${id}`);
  };

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return (
      parseInt(this.props.settings[1].set) +
      (this.props.product.tradeBuyingPrice * this.props.settings[0].set) / 100
    );
  };

  getAddedValue = () => this.props.product.marketPlacePrice * 0.09;

  getMarketPlaceAddedValue = shipCost => shipCost * 0.09;

  getMarcetPlaceCommission = () => this.props.product.marketPlacePrice * 0.1;

  getMarketPlaceCosts = () => {
    const { length, width, height, weight } = this.props.product;
    const shipCost = getDigiKalaShipping(length, width, height, weight);
    return (
      shipCost +
      this.getMarketPlaceAddedValue(shipCost) +
      this.getMarcetPlaceCommission() +
      this.getCostAndTax()
    );
  };

  render() {
    const { product, loadingProduct, settings } = this.props;
    const user = auth.getCurrentUser();

    if (!product || loadingProduct || !settings) return <h1>Loading...</h1>;

    const buyingDiscoutPercent = getPercent(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );
    const buyingDiscoutDiffPrice = getDiffPrice(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );

    const wholeProfitPercent = getPercent(
      product.tradeBuyingPrice,
      parseInt(product.wholePrice) - this.getCostAndTax()
    );

    const wholeProfitDiffPrice = getDiffPrice(
      product.tradeBuyingPrice,
      product.wholePrice - this.getCostAndTax()
    );

    const retailProfitPercent = getPercent(
      product.tradeBuyingPrice,
      product.retailPrice - this.getCostAndTax()
    );
    const retailProfitDiffPrice = getDiffPrice(
      product.tradeBuyingPrice,
      product.retailPrice - this.getCostAndTax()
    );

    const marketPlaceProfitPercent = getPercent(
      product.tradeBuyingPrice,
      product.marketPlacePrice - this.getMarketPlaceCosts()
    );
    const marketPlaceProfitDiffPrice = getDiffPrice(
      product.tradeBuyingPrice,
      product.marketPlacePrice - this.getMarketPlaceCosts()
    );

    const shippingPrice = getDigiKalaShipping(
      product.length,
      product.width,
      product.height,
      product.weight
    );

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>پردازش محصول</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              پردازش {product.name}
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
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  onClick={() => this.onEdit(product)}
                >
                  <i className="fa fa-wrench" />
                </button>
              </div>
              <div className="row">
                <div className="list-group p-4 text-center col-12">
                  <div className="row shadow rounded p-3">
                    <ListGroupItem
                      label="عنوان"
                      value={product.name}
                      float=""
                      size="6"
                    />
                    <ListGroupItem
                      label="دسته بندی"
                      value={product.category}
                      float=""
                      size="6"
                    />
                  </div>
                  <div className="row shadow rounded mt-3">
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="کد محصول"
                        value={product.proCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد تنوع"
                        value={product.diverseCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد نیکراد"
                        value={product.nikradCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد مای کیچن"
                        value={product.myKitchenCode}
                        size="12"
                      />
                      <ListGroupItem
                        label="کد مای کیچن پلاس"
                        value={product.myKitchenCode}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="قیمت لیست"
                        value={parseInt(product.tradeListPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت خرید"
                        value={parseInt(product.tradeBuyingPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت عمده فروشی"
                        value={parseInt(product.wholePrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت خرده فروشی"
                        value={parseInt(product.retailPrice)}
                        size="12"
                      />
                      <ListGroupItem
                        label="قیمت مارکت پلیس"
                        value={parseInt(product.marketPlacePrice)}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="درصد تخفیف مرجع"
                        value={buyingDiscoutPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد تخفیف بازرگان"
                        value={buyingDiscoutPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود عمده فروشی"
                        value={wholeProfitPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود خرده فروشی"
                        value={retailProfitPercent}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد سود مارکت پلیس"
                        value={marketPlaceProfitPercent}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-3 pt-3 pb-3">
                      <ListGroupItem
                        label="مبلغ تخفیف مرجع"
                        value={buyingDiscoutDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ تخفیف بازرگان"
                        value={buyingDiscoutDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود عمده فروشی"
                        value={wholeProfitDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود خرده فروشی"
                        value={retailProfitDiffPrice}
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ سود مارکت پلیس"
                        value={marketPlaceProfitDiffPrice}
                        size="12"
                      />
                    </div>

                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="هزینه بسته بندی و ارسال به مارکت پلیس"
                        value={2000}
                        size="12"
                      />
                      <ListGroupItem
                        label="هزینه پردازش و حمل و نقل مارکت پلیس"
                        value={shippingPrice}
                        size="12"
                      />
                    </div>

                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="درصد ارزش افزوده عمده فروشی"
                        value={parseInt(settings[0].set) + " %"}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد ارزش افزوده خرده فروشی"
                        value={parseInt(settings[0].set) + " %"}
                        size="12"
                      />
                      <ListGroupItem
                        label="درصد ارزش افزوده مارکت پلیس"
                        value={parseInt(settings[0].set) + " %"}
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-4 pt-3 pb-3">
                      <ListGroupItem
                        label="مبلغ ارزش افزوده عمده فروشی"
                        value={
                          (parseInt(settings[0].set) / 100) * product.wholePrice
                        }
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ ارزش افزوده خرده فروشی"
                        value={
                          (parseInt(settings[0].set) / 100) *
                          product.retailPrice
                        }
                        size="12"
                      />
                      <ListGroupItem
                        label="مبلغ ارزش افزوده مارکت پلیس"
                        value={
                          (parseInt(settings[0].set) / 100) *
                          product.marketPlacePrice
                        }
                        size="12"
                      />
                    </div>
                    <div className="shadow rounded col-12 pt-3 pb-3">
                      <div className="row">
                        <Input
                          type="text"
                          name="wholeProfitPercent"
                          label="درصد سود مستقیم"
                          size="2"
                          required="false"
                          value={PersianNum(this.state.data.wholeProfitPercent)}
                          onChange={this.handleProfitChange}
                        />
                        <Input
                          type="text"
                          name="wholeProfitDiffPrice"
                          label="مبلغ سود مستقیم"
                          size="2"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholeProfitDiffPrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChange}
                        />
                        <Input
                          type="text"
                          name="wholePrice"
                          label="قیمت فروش مستقیم"
                          size="2"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholePrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChange}
                        />
                      </div>
                      <div className="row">
                        <Input
                          type="text"
                          name="marketPlaceProfitPercent"
                          label="درصد سود مارکت پلیس"
                          size="2"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlaceProfitPercent
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                        <Input
                          type="text"
                          name="marketPlaceProfitDiffPrice"
                          label="مبلغ سود مارکت پلیس"
                          size="2"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlaceProfitDiffPrice.toLocaleString()
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                        <Input
                          type="text"
                          name="marketPlacePrice"
                          label="قیمت فروش مارکت پلیس"
                          size="2"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlacePrice.toLocaleString()
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                      </div>
                    </div>
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
  settings: state.setting.settings,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProps,
  { getProductItem, getSettingItems }
)(withStyles(rtlStyle)(Process));