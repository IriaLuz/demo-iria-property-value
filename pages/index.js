import React, { useEffect, useState } from "react";
import Detail from "../modules/property-details";
import { Banner } from "../components/banner";
import { loadAccount } from "../lib/load-account";
import { Loader } from "../components/loader";

export default function PropertyDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await loadAccount();
        setAccount(accountDetails.account);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Banner>Property Details</Banner>
      {isLoading ? (
        <Loader text="LOADING"></Loader>
      ) : (
        <Detail account={account} />
      )}
    </>
  );
}
