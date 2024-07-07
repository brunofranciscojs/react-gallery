import React, { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await new Promise((resolve) =>
        setTimeout(() => resolve("Data loaded!"), 2000)
      );
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    throw new Promise(() => {}); 
  }

  return <div>{data}</div>;
}

export default DataComponent;
