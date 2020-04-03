import { KabuTrendType } from "../types";
import texts from '../static/lang/texts.json';
import { Langs } from "../static/lang/lang";

const makeSellingAdvise = (locale: Langs = 'zh_TW') => (isOverdue: boolean, kabuTrendTypes: KabuTrendType[]) => {
  const localeText = texts[locale];
  const isOnlyOneType = kabuTrendTypes.length === 1;

  const isWaveType = 
    kabuTrendTypes.includes('wave') && 
    isOnlyOneType;
  const isThirdType = 
    kabuTrendTypes.includes('third') &&
    isOnlyOneType;
  const isForthType = 
    kabuTrendTypes.includes('forth') &&
    isOnlyOneType;
  const isPriceNotConfirmed = 
    kabuTrendTypes.includes('notDefined') ||
    kabuTrendTypes.length > 1;
    
  if(isOverdue) {
    return localeText['sellingAdvise.overdue'];
  }
  if(isPriceNotConfirmed) {
    return localeText['sellingAdvise.default'];
  }
  if(isWaveType) {
    return localeText['sellingAdvise.wave'];
  }
  if(isForthType) {
    return localeText['sellingAdvise.forth'];
  }
  if(isThirdType) {
    return localeText['sellingAdvise.third'];
  }
};

export default makeSellingAdvise;