import React, { useEffect, useState } from "react";
import Detail from "../modules/property-details";
import { Banner } from "../components/banner";
import { loadAccount } from "../lib/load-account";
import { Loader } from "../components/loader";

export default function PropertyDetails() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const accountDetails = await loadAccount();
      setData(accountDetails);
    };
    fetchData();
  }, []);

  return (
    <>
      <Banner>Property Details</Banner>
      {data ? (
        <Detail account={data.account} />
      ) : (
        <Loader text="LOADING"></Loader>
      )}
    </>
  );
}
