import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import accountTypeReducer from "./accountTypeReducer";
import accountLevelReducer from "./accountLevelReducer";
import settingReducer from "./settingReducer";
import productReducer from "./productReducer";
import personReducer from "./personReducer";
import categoryReducer from "./categoryReducer";
import colorReducer from "./colorReducer";
import materialReducer from "./materialReducer";
import supplierReducer from "./supplierReducer";
import subCategoryReducer from "./subCategoryReducer";
import groupReducer from "./groupReducer";
import companyReducer from "./companyReducer";
import identityReducer from "./identityReducer";
import marketSectorReducer from "./marketSectorReducer";
import officeSectorReducer from "./officeSectorReducer";

export default combineReducers({
  account: accountReducer,
  accountLevel: accountLevelReducer,
  accountType: accountTypeReducer,
  setting: settingReducer,
  product: productReducer,
  person: personReducer,
  company: companyReducer,
  category: categoryReducer,
  color: colorReducer,
  material: materialReducer,
  supplier: supplierReducer,
  subCategory: subCategoryReducer,
  group: groupReducer,
  identity: identityReducer,
  marketSector: marketSectorReducer,
  officeSector: officeSectorReducer
});
