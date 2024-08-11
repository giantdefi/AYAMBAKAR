import React, { useEffect, useState } from "react";
// sorce :
//https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/

//import Script from 'next/script'

//import TradingViewWidget from 'react-tradingview-widget'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

export default function TradingView() {




  return (
    <>
      <div className="w-full h-[800px] px-2 md:px-24 mt-4 animated fadeIn">
        <TradingViewWidget
          symbol={'XAUUSD'}
          theme={Themes.LIGHT}
          locale="en"
          autosize
          interval={"30"}
          studies = {["STD;RSI", "STD;MACD"]}
        />
      </div>
    </>
  )
}



