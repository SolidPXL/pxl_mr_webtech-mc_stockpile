'use client'

import { CSSProperties, FunctionComponent, useEffect, useState } from 'react'
import styles from './page.module.css'
import axios, { AxiosResponse } from 'axios';

import cabbage from '/public/icons/cabbage.png'
import carrot from '/public/icons/carrot.png'
import potato from '/public/icons/potato.png'
import wool from '/public/icons/white_wool.png'
import wheat from '/public/icons/wheat.png'
import egg from '/public/icons/egg.png'
import feather from '/public/icons/feather.png'
import wheatseed from '/public/icons/wheat_seeds.png'
import cabbageseed from '/public/icons/cabbage_seeds.png'
import sandwich from '/public/icons/chicken_sandwich.png'

import Image,{ StaticImageData } from 'next/image';

import ReactECharts, { EChartsOption } from 'echarts-for-react';

export default function Stock(){
    const [stock,setStock] = useState<Array<{id:number,item:string,amount:number}>>([]);
    const [logs, setLogs] = useState<Array<{id:number,item:string,method:'ADD'|'REMOVE'|'ERR',amount:number,extra:string|null,createdAt:string,updatedAt:string}>>([])

    useEffect(()=>{
        axios.get(`${process.env.BASE_URL}/api/get?type=stock&item=all`).then((res:AxiosResponse)=>{
            setStock(res.data)
        })
        axios.get(`${process.env.BASE_URL}/api/get?type=log`).then((res:AxiosResponse)=>{
            setLogs(res.data)
        })
    },[])

    //Graph data

    const xAxisLabels = stock.map((item:{id:number,item:string,amount:number})=>{return item.item})
    const yAxisLabels = stock.map((item:{id:number,item:string,amount:number})=>{return {value:item.amount,itemStyle:{color:colormap[item.item]}}})

    const echartsOption:EChartsOption = {
        title: {
            text: 'Stock data'
        },
        xAxis:[
            {
                type:'category',
                data: xAxisLabels
            }
        ],
        yAxis : [
            {
              type : 'value'
            }
        ],
        series: [
            {
                type:'bar',
                data:yAxisLabels,
                colorBy:'data',
                itemStyle: {
                    normal: {
                      barBorderWidth: 1,
                      barBorderColor: "#000"
                    }
                  }
            }
        ]
    }


    function exportLogs(event:React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        axios.get(`${process.env.BASE_URL}/api/get?type=log`).then((res:AxiosResponse)=>{
            const stringmap = ['id;item;method;amount;extra;created;updated\n']
            res.data.forEach((element:{id:number,item:string,method:'ADD'|'REMOVE'|'ERR',amount:number,extra:string|null,createdAt:string,updatedAt:string})=>{
                stringmap.push(`${element.id};${element.item};${element.method};${element.amount};${element.extra};${element.createdAt};${element.updatedAt}\n`)
            })
            // const datastring = stringmap.join('\n')
            const file = new File(stringmap, 'logs.csv', {
                type: 'text/plain',
            })

            const link = document.createElement('a')
            const url = URL.createObjectURL(file)

            link.href = url
            link.download = file.name
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            // window.open(url,"_self")
        })
        
    }

    function exportStock(event:React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        axios.get(`${process.env.BASE_URL}/api/get?type=stock&item=all`).then((res:AxiosResponse)=>{
            const stringmap = ['id;item;amount\n']
            res.data.forEach((element:{id:number,item:string,amount:number})=>{
                stringmap.push(`${element.id};${element.item};${element.amount}\n`)
            })
            // const datastring = stringmap.join('\n')
            const file = new File(stringmap, 'stock.csv', {
                type: 'text/plain',
            })

            const link = document.createElement('a')
            const url = URL.createObjectURL(file)

            link.href = url
            link.download = file.name
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            // window.open(url,"_self")
        })
    }

    return(
        <main className={styles.main}>
            <div className={styles.pageDiv}>
                <h2>Stock</h2>
                <div className={styles.cardwrapper}>
                    {stock.map((element:{id:number,item:string,amount:number},index:number)=>{
                        return <ItemCard item={element.item} imgURL={images[element.item]} stock={element.amount} key={`stock ${index}`}/>
                    })}
                </div>
                <h3>Graph</h3>
                <ReactECharts
                    option={echartsOption}
                    
                />
            </div>
            <div className={styles.pageDiv}>
                <h2>Logs</h2>
                <div className={styles.logWrapper}>
                    <LogItem item={'Name'} method={'other'} date={'Date'} amount={'Amount'}/>
                    {logs.map((element:{id:number,item:string,method:'ADD'|'REMOVE'|'ERR',amount:number,extra:string|null,createdAt:string,updatedAt:string},index:number)=>{
                        return <LogItem item={element.item} method={element.method} date={element.createdAt} amount={element.amount} key={`stock ${index}`}></LogItem>
                    })}
                </div>
            </div>
            <div className={styles.pageDiv}>
                <h2>Data dump</h2>
                <div className={styles.buttons}>
                    <div/>
                    <button className={styles.downloadButton} onClick={(event:React.MouseEvent<HTMLButtonElement>)=>{exportLogs(event)}}>Download log CSV</button>
                    <button className={styles.downloadButton} onClick={(event:React.MouseEvent<HTMLButtonElement>)=>{exportStock(event)}}>Download stock CSV</button>
                    <div/>
                </div>
            </div>
        </main>
    )
}

const images:{[key:string]:StaticImageData} = {
    cabbage,
    carrot,
    potato,
    wool,
    wheat,
    feather,
    egg,
    wheatseed,
    cabbageseed,
    sandwich
}

const colormap:{[key:string]:string} = {
    cabbage:'#a0da70',
    carrot:'#ffac39',
    potato:'#be9027',
    wool: '#f9fefd',
    wheat:'#ffdf8d',
    feather: '#999999',
    egg:'#d5bf90',
    wheatseed:'#1ecc0f',
    cabbageseed:'#766657',
    sandwich:'#876d38'
}

function ItemCard(props:{item:string,imgURL:StaticImageData, stock:number}){
    return(
        <div className={styles.stockCard}>
            <div className={styles.stockCardImgAlign}>
                <div className={styles.stockCardImgBox}>
                    <Image src={props.imgURL} style={{imageRendering:'pixelated'}} alt={`Image of ${props.item} with the minecraft texture`} width={100} layout='responsive'></Image>
                </div>
            </div>
            <p className={styles.stockCardTitle}>{props.item}</p>
            <div className={styles.stockCardAmount}>
                <p>{props.stock}</p>
            </div>
        </div>
    )
}

function LogItem(props:{item:string,method:string,date:string, amount:number|string}){
    const backgroundStyle = function():CSSProperties{switch(props.method){
        case 'ADD': return {backgroundColor:'rgba(116,255,74,0.05)'}
        case 'REMOVE': return {backgroundColor:'rgba(255,137,74,0.05)'}
        case 'ERR': return {backgroundColor:'rgba(250,27,27,0.2)'}
        default: return {}
    }}()

    const date = new Date(props.date)

    return(
        <div className={styles.logItemWrapper} style={backgroundStyle}>
            <div className={styles.logItemAlign}>
                {props.method!='other'&&<Image width={24} height={24} src={images[props.item]} alt={'Image of the item'}/>}
            </div>
            <div className={styles.logItemAlign}>
                <p>{props.item}</p>
            </div>
            <div className={styles.logItemAlign}>
                <p>{props.method=='other'?'Method':props.method}</p>
            </div>
            <div className={styles.logItemAlign}>
                <p>{props.amount=='Amount'?'Amount':props.amount}</p>
            </div>
            <div className={styles.logItemAlign}>
                <p>{props.date=='Date'?'Date':`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
            </div>
        </div>
    )
}