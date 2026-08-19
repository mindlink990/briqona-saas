import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

const range=(offset:number)=>{const d=new Date();d.setUTCHours(0,0,0,0);d.setUTCDate(d.getUTCDate()+offset);return {start:d,end:new Date(d.getTime()+86400000)}}
const total=(rows:{type:string;amount:number}[])=>rows.reduce((x,r)=>({...x,[r.type.toLowerCase()]:x[r.type.toLowerCase()]+r.amount}),{revenue:0,expense:0,refund:0} as Record<string,number>)
export async function GET(){const y=range(-1),t=range(0);const [a,b]=await Promise.all([db.financialTransaction.findMany({where:{occurredAt:{gte:y.start,lt:y.end}}}),db.financialTransaction.findMany({where:{occurredAt:{gte:t.start,lt:t.end}}})]);const Y=total(a),T=total(b);const yp=Y.revenue-Y.expense-Y.refund,tp=T.revenue-T.expense-T.refund;return NextResponse.json({yesterday:{...Y,profit:yp},today:{...T,profit:tp},change:{revenue:T.revenue-Y.revenue,expense:T.expense-Y.expense,refund:T.refund-Y.refund,profit:tp-yp}})}
