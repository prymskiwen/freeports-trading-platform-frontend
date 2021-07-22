import axios from "../util/axios";
import TradeRequest from "../types/TradeRequest";

const getTradeRequests = (
  organizationId: string,
  deskId: string,
  investorId: string
): Promise<TradeRequest[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/organization/${organizationId}/desk/${deskId}/investor/${investorId}/trade`
      )
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

const createTradeRequest = (
  organizationId: string,
  deskId: string,
  investorId: string,
  trade: TradeRequest
): Promise<TradeRequest[]> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `/organization/${organizationId}/desk/${deskId}/investor/${investorId}/trade`,
        trade
      )
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};

export { getTradeRequests as default, getTradeRequests, createTradeRequest };
