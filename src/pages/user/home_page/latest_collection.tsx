import React from "react";
import prince from "../../../assets/images/prince.jpg";
import princePipes from "../../../assets/images/princePipes.jpg";

const LatestCollection = () => {
  return (
    <React.Fragment>
        <div className="lower">
          <h1>
            <span className="heading" data-testid="heading"># We have the collection of best PVC pipes</span>
          </h1>
          <div className="lhead">
            <div className="lcontent1">
              <img src={prince} alt="latestCollection-1" className="limage-left "></img>
            </div>
            <div className="lcontent2">
              <img src={princePipes} alt="latestCollection-2" className="limage-right"></img>

              <div className="latest-content-2">
                <p className="latest-head">Have a look on our products</p>
                <button className="latest-child">View Products</button>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
};

export default LatestCollection;
