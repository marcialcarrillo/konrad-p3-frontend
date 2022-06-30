import { useCallback, useState } from "react";

const useFetchData = ({
  url,
  _method = "GET",
  data = "",
  _headers = {
    "Content-Type": "application/json",
  },
}) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: true });

  const callAPI = useCallback(() => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    let payload = {};
    if (data === "") {
      payload = {
        method: _method,
        headers: _headers,
      };
    } else {
      payload = {
        method: _method, // *GET, POST, PUT, DELETE, etc.
        headers: _headers,
        body: JSON.stringify(data),
      };
    }

    fetch(url, payload)
      .then((res) => res.json())
      .then((_data) => setRes({ data: _data, isLoading: false, error: null }));
  }, [url, _method, data]);
  return [res, callAPI];
};

export default useFetchData;
