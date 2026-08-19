import { NextResponse } from 'next/server'
import { db } from '@briqona/database'

function dayRange(offset:number){const d=new Date();d.setUTCHours(0,0,0,0);d.setUTCDate(d.getUTCDate()+offset);return {start:d,end:new Date(d.getTime()+86400000)}}
function totals(rows:{type:string;amount:number}[]){return rows.reduce((a,r)=>{if(r.type==='REVENUE')a.revenue+=r.amount;if(r.type==='EXPENSE')a.expenses+=r.amount;if(r.type==='REFUND')a.refunds+=r.amount;return a},{revenue:0,expenses:0,refunds:0})}
export async function GET(){const y=dayRange(-1),t=dayRange(0);const [yr,tr]=await Promise.all([db.financialTransaction.findMany({where:{occurredAt:{gte:y.start,lt:y.end}}}),db.financialTransaction.findMany({where:{occurredAt:{gte:t.start,lt:t.end}}})]);const a=totals(yr),b=totals(tr);const profitA=a.revenue-a.expenses-a.refunds,profitB=b.revenue-b.expenses-b.refunds;return NextResponse.json({yesterday:{...a,profit:profitA},today:{...b,profit:profitB},change:{revenue:b.revenue-a.revenue,expenses:b.expenses-a.expenses,refunds:b.refunds-a.refunds,profit:profitB-profitA}})}
