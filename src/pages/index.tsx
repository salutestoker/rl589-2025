// pages/index.tsx
import Head from 'next/head'
import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FireCanvas } from '@/components/FireCanvas'
import { TokenDashboard } from '@/components/TokenDashboard'
import { NFTGallery } from '@/components/NFTGallery'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

type Section = 'home' | 'tokenomics' | 'nfts' | 'merch'

/* ──────────────────────────────────────────────────────────────── */
/*                    Animation helpers                            */
/* ──────────────────────────────────────────────────────────────── */
const sectionVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Home() {
    const [section, setSection] = useState<Section>('home')

    const handleSectionChange = (
        e: React.MouseEvent<HTMLAnchorElement>,
        next: Section,
    ) => {
        e.preventDefault()
        setSection(next)
    }

    return (
        <>
            <Head>
                <title>The REAL 589</title>
                <meta
                    name="description"
                    content="Discover the REAL 589 Token – redefining the crypto landscape with a unique blend of lore, mystery and community engagement."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
                {/* ─────────────── Header / Nav ─────────────── */}
                <header className="header">
                    <a href="#" onClick={(e) => handleSectionChange(e, 'home')}>
                    <Image
                        className={styles.logo}
                        width={400}
                        height={400}
                        src="/rl589-x-logo.png"
                        alt="RL589 logo"
                        priority
                    />
                    </a>
                    <ul className="nav">
                        <li>
                            <a
                                href="#"
                                onClick={(e) => handleSectionChange(e, 'tokenomics')}
                                className={section === 'tokenomics' ? 'active' : undefined}
                            >
                                Tokenomics
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => handleSectionChange(e, 'nfts')}
                                className={section === 'nfts' ? 'active' : undefined}
                            >
                                NFTs
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => handleSectionChange(e, 'merch')}
                                className={section === 'merch' ? 'active' : undefined}
                            >
                                Merch
                            </a>
                        </li>
                        <div className="socials">
                        <li>
                            <a
                                className="telegram-logo"
                                href="https://t.co/xpQVVID2L1"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image src="/icon-telegram.svg" width={30} height={30} alt="Telegram" />
                            </a>
                        </li>
                        <li>
                            <a
                                className="x-logo"
                                href="https://x.com/RL589Token"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image src="/x-logo-black.png" width={20} height={20} alt="X (Twitter)" />
                            </a>
                        </li>

                            <li>
                                <a
                                    className="tiktok-logo"
                                    href="https://t.co/jviDnLi5G8"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image src="/tiktok-black.svg" width={20} height={20} alt="Tiktok" />
                                </a>
                            </li>
                        </div>
                    </ul>
                </header>

                {/* ─────────────── Main (animated) ─────────────── */}
                <main className={styles.main}>
                    <AnimatePresence mode="wait">
                        {section === 'home' && (
                            <motion.section
                                key="home"
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className={styles.hero}>
                                    <div className={styles['intro-video']}>
                                        <video
                                            src="/videos/RL589-intro.mp4"
                                            loop
                                            autoPlay
                                            muted
                                            playsInline
                                        />
                                    </div>
                                    <div className="large-logo">
                                        <Image
                                            width={562}
                                            height={395}
                                            src="/RL589-logo.png"
                                            alt="RL589"
                                        />
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {section === 'tokenomics' && (
                            <motion.section
                                key="tokenomics"
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <TokenDashboard />
                            </motion.section>
                        )}

                        {section === 'nfts' && (
                            <motion.section
                                key="nfts"
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <NFTGallery />
                            </motion.section>
                        )}

                        {section === 'merch' && (
                            <motion.section
                                key="merch"
                                variants={sectionVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="merch">
                                <p>Merch store coming soon…</p>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            <FireCanvas />
        </>
    )
}
