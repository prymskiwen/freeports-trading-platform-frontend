import TradeRequest from "../../../../types/TradeRequest";

export interface TradesState {
  tradeRequests: TradeRequest[];
  loading: boolean;
}
