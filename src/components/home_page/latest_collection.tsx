import React from "react";
import latestT from "../../assets/images/latestT.jpg";
import latestT1 from "../../assets/images/latestT1.jpg";
import { LatesTilesCollection, DiscountOffer, ViewDetails } from "../../assets/constants/constant";

const LatestCollection = () => {
  return (
    <React.Fragment>
        <div className="lower">
          <h1>
            <span className="heading" data-testid="heading">{LatesTilesCollection}</span>
          </h1>
          <div className="lhead">
            <div className="lcontent1">
              <img src={latestT} alt="latestCollection-1" className="limage "></img>

              <div className="latest-content-1">
                <p className="latest-head">{DiscountOffer}</p>
                <button className="latest-child">{ViewDetails}</button>
              </div>
            </div>
            <div className="lcontent2">
              <img src={latestT1} alt="latestCollection-2" className="limage"></img>

              <div className="latest-content-2">
                <p className="latest-head">{DiscountOffer}</p>
                <button className="latest-child">{ViewDetails}</button>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
};

export default LatestCollection;
