import React,{useState, useEffect} from "react";
import './Charts.css'
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

export default function Chart(){
    const [historicalData, setHistoricalData] = useState(null)
    const [daysNum, setDaysNum] = useState('1')
    useEffect(()=>{
        const fetchHistoricalData = async ()=>{
            try{
                setDaysNum('1')
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",{
                        params: {
                            vs_currency: 'usd',
                            days: daysNum
                        }
                    })
                const filteredData = response.data.prices.map(item=>({
                    date: new Date(item[0]).toLocaleTimeString([],{hour:'2-digit', minute: '2-digit'}),
                    price: item[1]
                }));
                setHistoricalData(filteredData)
                console.log(filteredData)
            }catch(error){
                console.error("An error fetching historical",error)
            }
        }
        fetchHistoricalData()
    },[])
    const determineLineColor = (data, index)=>{
        if(index === 0){
            return 'black';
        }else{
            const prevOpen = data[index -1].price;
            const currentOpen = data[index].price;
            return currentOpen > prevOpen ? 'green': 'ren';
        }
    }
    const fetchDay = async()=>{
        try{
            setHistoricalData(null)
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",{
                    params: {
                        vs_currency: 'usd',
                        days: daysNum
                    }
                })
            const filteredData = response.data.prices.map(item=>({
                date: new Date(item[0]).toLocaleTimeString([],{hour:'2-digit', minute: '2-digit'}),
                price: item[1]
            }));
            setHistoricalData(filteredData)
        }catch(error){
            console.error("An error fetching historical",error)
        }
    }

    const fetchOthers = async()=>{
        try{
            setHistoricalData(null)
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",{
                    params: {
                        vs_currency: 'usd',
                        days: daysNum
                    }
                })
            const filteredData = response.data.prices.filter((item, index, array)=>{
                const currentDate = new Date(item[0]).toLocaleDateString();
                const previousDate = index > 0 ? new Date(array[index - 1][0]).toLocaleDateString() : null;
                return currentDate !== previousDate
            }).map(item=>({
                date: new Date(item[0]).toLocaleDateString(),
                price: item[1]
            }));
            setHistoricalData(filteredData)
        }catch(error){
            console.error("An error fetching historical",error)
        }
    }
    const handleDay = ()=>{
        setDaysNum('1')
        fetchDay()
    }
    const handleWeek = ()=>{
        setDaysNum('7')
        fetchOthers()
    }
    const handleMonth = ()=>{
        setDaysNum('30')
        fetchOthers()
    }
    const getYTicks = (data)=>{
        if(data.length ===0) return [];
        const minPrice = Math.min(...data.map(d => d.price));
        const maxPrice = Math.max(...data.map(d=> d.price));
        const ticks = [];
        for(let i = Math.floor(minPrice /5000)* 5000; i <= Math.ceil(maxPrice / 5000)* 5000; i += 5000){
            ticks.push(i);
        }
        return ticks;
    }
    return(
        <div className="chartCont">
             <h3>Trend last <span>{daysNum=== '1' && '24hrs'}{daysNum=== '7' && '1 week'}{daysNum=== '30' && '1 month'}.</span></h3>
            <ul className="activeDays">
                <li><button onClick={handleDay} style={{backgroundColor: daysNum==='1' ? "rgb(6, 163, 224, 0.3)" : "transparent"}}>Day</button></li>
                <li><button onClick={handleWeek} style={{backgroundColor: daysNum==='7' ? "rgb(6, 163, 224, 0.3)" : "transparent"}}>Week</button></li>
                <li><button onClick={handleMonth} style={{backgroundColor: daysNum==='30' ? "rgb(6, 163, 224, 0.3)" : "transparent"}}>Month</button></li>
            </ul>
            {historicalData &&<div className="myChart">
            <ResponsiveContainer className="chart" width="100%" height={400}>
            <LineChart data={historicalData} className="theChart">
                <CartesianGrid id="myCart" strokeDasharray="3 3" />
                <XAxis id="myXaxis" dataKey="date"/>
                <YAxis id="myYaxis" ticks={getYTicks(historicalData)}/>
                <Tooltip/>
                <Legend/>
                <Line type="step" dataKey="price"  id="mychartLine" activeDot={{r: 8}} dot={false}/>
            </LineChart>
            </ResponsiveContainer>
            </div>}
            {/*stroke={(entry, index)=> determineLineColor(historicalData, index)}*/}
        </div>
    )
    
}