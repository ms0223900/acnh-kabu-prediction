import { SingleWeekKabuRecord } from "../types";
import { Callback } from "common-types";

export interface OtherDayKabuFormContainerProps {
  initOtherDayPrices: SingleWeekKabuRecord['otherDaysPrice']
}

export interface ResetButtonContainerProps {
  resetPricesFn: Callback
}