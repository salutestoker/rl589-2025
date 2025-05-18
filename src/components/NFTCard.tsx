// components/NFTCard.tsx
import Image from 'next/image'
import styles from './NFTCard.module.css'
import { NFTItem } from '@/data/nfts'

export function NFTCard({ id, name, image, description, link }: NFTItem) {
    return (
        <a href={link} className={styles.card} target="_blank" rel="noreferrer">
            <div className={styles.thumb}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="200px"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <h3 className={styles.name}>{name}</h3>
            {description && <p className={styles.desc}>{description}</p>}
            <small className={styles.id}>{id}</small>
        </a>
    )
}
