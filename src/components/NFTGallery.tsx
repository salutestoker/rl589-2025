// components/NFTGallery.tsx
'use client'

import { nfts } from '@/data/nfts'
import { NFTCard } from './NFTCard'
import styles from './NFTGallery.module.css'
import { motion } from 'framer-motion'

/* Container + item variants for staggered cascade */
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
    },
}
const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function NFTGallery() {
    if (!nfts.length) return <p>No NFTs in the list yet.</p>

    return (
        <motion.section
            className={styles.gallery}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {nfts.map((nft) => (
                <motion.div key={nft.id} variants={item}>
                    <NFTCard {...nft} />
                </motion.div>
            ))}
        </motion.section>
    )
}
