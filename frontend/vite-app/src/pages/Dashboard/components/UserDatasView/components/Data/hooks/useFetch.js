import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (addr, dat) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(addr, dat);

      const data = await response.data.map((element) => ({
        dataType: element.dataType,
        data: element.dataData,
      }));

      setData(data);
    };

    getData();
  }, [addr]);

  return [data];
};

export default useFetch;
