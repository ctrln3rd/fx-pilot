import React from "react";
import './Education.css'
import { useState } from "react";

export default function Education(){
    
    return(
        <div className="educationCont">
            <h2 id="educationTitle">Blockchain Education / e-Course</h2>
            <p>Welcome to fxgaurd Education Centre. Here at the Bitcoin education centre our aim is to teach you in simple 
            terms about the Bitcoin Investment. From understanding the underlying reason as to why the Bitcoin Investment 
            exists to basic strategies that are the foundations of understanding the dynamics of the Bitcoin market.<br/><br/>
            The education centre is essentially a Blockchain resource centre that will grow with time. Our intention is to create
           a library of resources for our clients to access, place presentations on key topics and essentially add value by 
           providing the tools and knowledge our clients require to trade with confidence.<br/><br/>
           We will also use the resource centre to update our clients on upcoming seminars and webinars 
           and occasionally we will seek to get high profile and experienced participants in the Bitcoin
            market to offer us their insights through interviews and live question and answer sessions.</p>
            <DropdownParagraph title='introduction to bitcoin'  content="<h5>What's bitcoin? </h5><p>Bitcoin is a digital currency created in January 2009. 
            It follows the ideas set out in a whitepaper by the mysterious and pseudonymous developer Satoshi Nakamoto, whose true identity has yet to be verified. 
            Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies. 
            There are no physical bitcoins, only balances kept on a public ledger in the cloud, that – along with all Bitcoin transactions – is verified by a massive amount of computing power. 
            Bitcoins are not issued or backed by any banks or governments, nor are individual bitcoins valuable as a commodity. Despite it not being legal tender, 
            Bitcoin charts high on popularity, and has triggered the launch of hundreds of other virtual currencies collectively referred to as Altcoins.</p>
            <h5>How can i trade bitcoin? </h5><p>Once you’ve settled on your position, you’ll need to place a trade using our web trading platform.
             You’ll enter the amount you want to stake on your trade in the deal ticket. You can also define your close conditions: 
            set a stop to close your position when the market moves against you by a certain amount, or a limit for when it moves in your favour. Stops and limits are central to good risk management.
             If you expect bitcoin to rise in value, you'll then ‘buy’ the market. If you think it will fall, you'll ‘sell.’ To close your position, you simply place the reverse of your original trade. 
             So if you bought in the first instance, you’ll sell the same amount; if you sold, you’ll now buy. 
            We’ll automatically fill your deal ticket with the position size, meaning you simply need to click ‘buy’ or ‘sell’ to close your trade. </p> <h5>
            Bitcoin Market Hours</h5> <p>Unlike trading stocks and commodities, the cryptocurrency market isn’t traded on a regulated exchange. 
            Rather, the market is open 24/7 across a growing number of exchanges. Successful crypto traders understand that, 
            although the market for digital currency is open nonstop, more trades are successful if transacted when global market activity is high.
             Outside the hours of these global markets, trading can be light, potentially resulting in weaker exchange rates and difficulty in selling your coins.</p>" />
            
            <DropdownParagraph title='Understanding Bitcoin Prices' content="<h5>The spread</h5> <p>While bitcoin’s volatility makes the cryptocurrency an attractive opportunity, it also makes it a particularly risky market to speculate on.
             Its price can shift significantly and suddenly – and since the bitcoin market operates around the clock, this is liable to happen any time of day.
              As a decentralised currency, bitcoin is free from many of the economic and political concerns which affect traditional currencies. 
             But as a market still in its adolescence, there is a lot of uncertainty entirely unique to the cryptocurrency. 
            Any one of the following factors could have a sudden and significant impact on its price, and as such you need to learn to navigate the risks they may open up</p>" />
            
            <DropdownParagraph  title='Understanding currency Pairs' content="<h5>The majors</h5><p>The bid (SELL) price is the price that traders can sell currency at, 
            and the ask (BUY) price is the price that traders can buy currency at. 
            This may seem confusing as it is only natural to think of “bid” in terms of buying so just remember the bid/ask terminology is from the broker’s perspective. Traders will always be looking to buy forex when the price
             is low and sell when the price rises; or sell forex in anticipation that the currency will depreciate and buy it back at a lower price in the future.</p>
             <h5>Current pairs</h5><p>The price to buy a currency will typically be more than the price to sell the currency.
             This difference is called the spread and is where the broker earns money for executing the trade. 
            Spreads tend to be tighter (less) for major currency pairs due to their high trading volume and liquidity. 
            The EUR/USD is the most widely traded currency pair, so it is no surprise that the spread in this example is 0.6 pips.</p>" />

            <DropdownParagraph title='Introduction to Margin' content="<h5>What's bitcoin Margin?</h5> <p>Margin trading, also known as leveraged trading,
             is a form of trading that uses borrowed funds in order to trade larger amounts of a specific asset.
             For example, if you have 1 Bitcoin on Binance, you can borrow up to 2 Bitcoins more and trade as if you had 3 Bitcoins.
            While margin trading increases your profits when successful, it also accelerates your loses when unsuccessful.
            From Bitcoin Margin Trading Options for Beginners (2020 Updated) https://99bitcoins.com/bitcoin-trading/margin/</p><h5>Working example of margin</h5><p>
            Some exchanges offer 1:1 leverage, meaning that traders can borrow 100% of their holdings. For instance, a trader with a balance of 1 BTC will effectively be able to trade 2 BTC, increasing profit potential.
            <br/><br/>Other exchanges offer 2.5:1, 3.3:1, 20:1, and even 100:1 margins. With 100:1 margin trading, I can find myself either up 500% in minutes or liquidated in the blink of an eye. 
            It’s more like playing the slot machines at the casino, so I don’t necessarily recommend it.
            <br/><br/>From Bitcoin Margin Trading Options for Beginners (2020 Updated) https://99bitcoins.com/bitcoin-trading/margin/</p><h5>Conclusion</h5><p>Margin trading is a risky business. 
            Beginners should start out trading small amounts at a margin of no more than 2:1. Ideally, never use 100% of funds in any one transaction
            <br/><br/>For instance, placing $1,000 into an account and using only $100 of personal capital with 2x leverage per transaction would still leave a trader with $900 if their margin trade didn’t work out.
            <br/><br/>In general margin trading is suitable for experienced traders. If you’re just starting out it’s better to use demo accounts or trade without any leverage before taking it up a notch.
            <br/><br/>From Bitcoin Margin Trading Options for Beginners (2020 Updated) https://99bitcoins.com/bitcoin-trading/margin/ </p>" />
            
            <DropdownParagraph title='Understanding Risks' content="<h5>Introduction</h5><p>The risks of trading cryptocurrencies are mainly related to its volatility. 
            They are high-risk and speculative, and it is important that you understand the risks before you start trading.</p><h5>What is risk?</h5><p>
            With CMC Markets you can trade bitcoin and ethereum via a spread bet or CFD account. 
            This means you are exposed to slightly different risks compared to when buying these cryptocurrencies outright. </p><h5>The Risk: Reward Ratio</h5><p>
            market volatility can cause prices to move from one level to another without actually passing through the level in between. 
            Gapping (or slippage) usually occurs during periods of high market volatility. 
            As a result, your stop-loss could be executed at a worse level than you had requested. This can worsen losses if the market moves against you.</p>" />
           
            <DropdownParagraph title='Approaches to Trading the Market' content="<h5>Technical Analysis</h5> <p>
            Active trading is the act of buying and selling securities based on short-term movements to profit from the price movements on a short-term stock chart. 
            The mentality associated with an active trading strategy differs from the long-term, buy-and-hold strategy found among passive or indexed investors. 
            Active traders believe that short-term movements and capturing the market trend are where the profits are made.

            <br/><br/>Some actually consider position trading to be a buy-and-hold strategy and not active trading. However, position trading, when done by an advanced trader, can be a form of active trading.
             Position trading uses longer term charts – anywhere from daily to monthly – in combination with other methods to determine the trend of the current market direction. 
            This type of trade may last for several days to several weeks and sometimes longer, depending on the trend. Trend traders look for successive higher highs or lower highs to determine the trend of a security. 
            By jumping on and riding the 'wave' trend traders aim to benefit from both the up and downside of market movements. 
            Trend traders look to determine the direction of the market, but they do not try to forecast any price levels. 
            Typically, trend traders jump on the trend after it has established itself, and when the trend breaks, they usually exit the position. 
            This means that in periods of high market volatility, trend trading is more difficult and its positions are generally reduced.</p><h5>Fundamental Analysis</h5><p>
            There's a reason active trading strategies were once only employed by professional traders. 
            Not only does having an in-house brokerage house reduce the costs associated with high-frequency trading, 
            but it also ensures better trade execution.1﻿2﻿ Lower commissions and better execution are two elements that improve the profit potential of the strategies.3﻿
             Significant hardware and software purchases are typically required to successfully implement these strategies. In addition to real-time market data, 
            these costs make active trading somewhat prohibitive for the individual trader, although not altogether unachievable." />
        </div>
    )
}

const DropdownParagraph = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <>
        <h4 onClick={toggleDropdown} style={{color: isOpen? '#aa012c':'#616161'}}>{title} <img src={`${process.env.PUBLIC_URL}/images/more.png`} alt="+"/></h4>
        {isOpen && <div className="topic" dangerouslySetInnerHTML={{ __html: content }} />}
      </>
    );
  };