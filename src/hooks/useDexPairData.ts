import { useEffect, useState } from 'react';

const PAIR_URL =
    'https://api.dexscreener.com/latest/dex/pairs/xrpl/589.r47648mxjvdjutgk7zaij1b2qsaqaehisl_xrp';

export interface DexPair {
    priceUsd: string;
    priceNative: string;
    marketCap: number;          // $ – native for XRPL it’s already XRP
    fdv: number;
    volume: { h24: number };
    liquidity: { usd: number };
    priceChange: {
        h1:  number;
        h24: number;
        d7:  number;      // ← rename
    };
    txns: { h24: { buys: number; sells: number } };
    // attach historical candles ↓
    priceChart: { t: number; priceUsd: number; volume: number }[];
}

interface State {
    data: DexPair | null;
    loading: boolean;
    error: string | null;
}

/**
 * Polls DexScreener once on mount.  Re-run the `setInterval`
 * if you’d like live updates.
 */
export const useDexPairData = (): State => {
    const [state, setState] = useState<State>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const res = await fetch(PAIR_URL, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                // DexScreener wraps the response in { pairs: [...] }
                setState({ data: json.pairs[0] as DexPair, loading: false, error: null });
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setState({ data: null, loading: false, error: (err as Error).message });
            }
        }

        load();
        return () => controller.abort();
    }, []);


    return state;
};