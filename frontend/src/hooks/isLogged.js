import { useState, useEffect } from "react";

const isLogged = (url) => {
  const [log, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchD = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        const responseJSON = await response.json();

        if (response.ok) {
          const info = responseJSON.info;

          console.log(info);

          if (info === 200) {
            console.log("Logged");
            setIsLogged((current) => !current);
            return log;
          }
          if (info === 401) {
            console.log("Not Logged");
            setIsLogged((current) => current);
            return log;
          }
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchD();
  }, [url]);

  return log;
};

export default isLogged;
