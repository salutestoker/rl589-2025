import React from 'react';
import { palette } from '@/styles/theme';

import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    RadialBarChart,
    RadialBar,
    Legend,
    CartesianGrid,
} from 'recharts';

import { useDexPairData } from '@/hooks/useDexPairData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Image from "next/image";

export const TokenDashboard = () => {
    const { data, loading, error } = useDexPairData();

    if (loading) return <p>Loading dashboard…</p>;
    if (error || !data) return <p style={{ color: 'crimson' }}>{error ?? 'No data'}</p>;

    /** ---------- transform data ---------- */
    const chartData =
        data.priceChart?.map(d => ({
            time: new Date(d.t).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            price: +d.priceUsd,
            volume: d.volume,
        })) ??
        [
            {
                time: new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                price: +data.priceUsd,
                volume: data.volume?.h24 ?? 0,
            },
        ];


    const { priceUsd, marketCap, fdv, liquidity, volume, priceChange } = data;

    /** ---------- layout ---------- */
    return (
        <div
            className="token-dashboard"
        >
            <Card>
                <CardHeader><CardTitle style={{ marginBottom: '.25rem' }}><Image
                    style={{maxWidth: '45px', height: 'auto'}}
                    width={562}
                    height={395}
                    src="/RL589-logo.png"
                    alt="RL589"
                /></CardTitle></CardHeader>
                <CardContent>
                    <h2 style={{ margin: 0, color: palette.txt }}>
                        {(+priceUsd).toFixed(6)} XRP
                    </h2>
                    <div className="card-tokenomics">
                        <p style={{ color: priceChange?.h24 >= 0 ? palette.up : palette.down }}>
                            {(priceChange?.h24 ?? 0).toFixed(2)} % (24 h)
                        </p>

                    <dl style={{ display: 'grid', gridTemplateColumns: '1fr auto', rowGap: 4 }}>
                        <dt>Volume (24 h):</dt><dd>{volume.h24.toLocaleString()} XRP</dd>
                        <dt>Market Cap:</dt>      <dd>${marketCap.toLocaleString()}</dd>
                        <dt>Supply ≈:</dt>        <dd>{Math.round(marketCap / +priceUsd).toLocaleString()}</dd>
                    </dl>

                    {/* --- price-change boxes --- */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3,1fr)',
                            gap: 8,
                            marginTop: '1rem',
                        }}
                    >
                        {[
                            { label: '1 h',  v: priceChange.h1 },
                            { label: '24 h', v: priceChange.h24 },
                            { label: '7 d',  v: priceChange.d7 },
                        ].map(({ label, v }) => (
                            <div
                                key={label}
                                style={{
                                    padding: '.5rem',
                                    background: v >= 0 ? 'rgba(22,163,74,.15)' : 'rgba(7,7,7,.65)',
                                    borderRadius: 8,
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: 12, color: '#9ca3af' }}>{label}</div>
                                <div
                                    style={{
                                        fontWeight: 600,
                                        color: v >= 0 ? palette.up : palette.down,
                                    }}
                                >
                                    {(v ?? 0).toFixed(2)}%
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </CardContent>
            </Card>



            {/* Liquidity donut */}
            <Card>
                <CardHeader><CardTitle>Liquidity</CardTitle></CardHeader>
                <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <ResponsiveContainer width={220} height={180}>
                        <RadialBarChart
                            innerRadius="80%"
                            outerRadius="100%"
                            data={[{ name: 'usd', value: liquidity.usd }]}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar fill="url(#barGrad)" dataKey="value" cornerRadius={6} />
                            <Legend
                                iconSize={0}
                                layout="vertical"
                                verticalAlign="middle"
                                formatter={() => `$${liquidity.usd.toLocaleString()}`}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Volume bars */}
            <Card>
                <CardHeader><CardTitle>Volume – 24 h</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="time" hide />
                            <YAxis width={40} tickFormatter={v => `${v / 1_000}k`} />
                            <Tooltip
                                wrapperStyle={{ outline: 'none' }}              // remove focus ring
                                contentStyle={{
                                    background: '#111827',  // same dark card bg
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '0.5rem 0.75rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,.4)',
                                }}
                                labelStyle={{ color: '#9ca3af', fontSize: 12 }} // timestamp row
                                itemStyle={{ color: '#f3f4f6', fontSize: 13 }}  // value rows
                                cursor={{
                                    fill: 'transparent',// hover line / bar
                                    stroke: '#000',
                                    strokeWidth: 1,
                                }}
                                formatter={(v: number) => v.toLocaleString()}
                                labelFormatter={l => l}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"  stopColor={palette.gradFrom}/>
                                    <stop offset="100%" stopColor={palette.gradTo}/>
                                </linearGradient>
                            </defs>
                            <Bar  dataKey="volume" barSize={6} radius={[4, 4, 0, 0]}
                                  fill="url(#barGrad)"   />
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ margin: '0.5rem 0 0' }}>
                        Total&nbsp;<strong>${volume.h24.toLocaleString()}</strong>
                    </p>
                </CardContent>
            </Card>

            {/* FDV vs MC bar */}
            <Card>
                <CardHeader><CardTitle>FDV vs Market Cap</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                            data={[
                                { label: 'Market Cap', value: marketCap },
                                { label: 'FDV', value: fdv },
                            ]}
                            layout="vertical"
                            margin={{ left: 20 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="label" width={100} />
                            <Bar fill="url(#barGrad)" dataKey="value" barSize={12} radius={4} />
                            <Tooltip
                                wrapperStyle={{ outline: 'none' }}              // remove focus ring
                                contentStyle={{
                                    background: '#111827',  // same dark card bg
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '0.5rem 0.75rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,.4)',
                                }}
                                labelStyle={{ color: '#9ca3af', fontSize: 12 }} // timestamp row
                                itemStyle={{ color: '#f3f4f6', fontSize: 13 }}  // value rows
                                cursor={{
                                    fill: 'transparent',// hover line / bar
                                    stroke: '#000',
                                    strokeWidth: 1,
                                }}
                                formatter={(v: number) => `$${v.toLocaleString()}`} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>


        </div>
    );
};
