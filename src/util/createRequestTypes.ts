// eslint-disable-next-line no-shadow
enum RequestEvents {
  REQUEST = "REQUEST",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

type Res = {
  [key in RequestEvents]: string;
};

export const createRequestTypes = (base: string, scope?: string): Res => {
  const res: Res = {
    REQUEST: "",
    SUCCESS: "",
    FAILURE: "",
  };
  [RequestEvents.REQUEST, RequestEvents.SUCCESS, RequestEvents.FAILURE].forEach(
    // eslint-disable-next-line
    (type) => (res[type] = `${scope || "app/Api/"}${base}_${type}`)
  );
  return res;
};

export default createRequestTypes;
