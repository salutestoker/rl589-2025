// data/nfts.ts
//
// Manually curate your NFTs here.
// ────────────────
// • `id` just has to be unique in the list (token ID, slug, whatever)
// • `link` is where users go when they click the card
// • `image` can be IPFS, HTTPS, or a local “/public/…” file

export type NFTItem = {
    id:   string
    name: string
    link: string
    image: string
    description?: string
}

export const nfts: NFTItem[] = [
    {
        id:   '',
        name: 'The 589 Seer',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692E5479864F03A8FBB1',
        image:'/nfts/fae8d2822429-4845-8671-4c3ec44c3368d44e319f54e3-4765-a45f-13.webp',
    },
    {
        id:   '',
        name: 'The Obsidian Sigil',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E5653D30A03A8FB6E',
        image:'/nfts/e720b24b6788-4a0b-976a-7722aff522c8bcb88b8155e6-4a87-856d-a6.webp',
    },
    {
        id:   '',
        name: 'The Oracle’s Riddle',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E2888310403A8FB6C',
        image:'/nfts/162338c86caa-40fc-9db3-74c347b5b0f2bddfdcab2f58-48a2-914b-91.webp',
    },
    {
        id:   '',
        name: 'Keeper of Whispers',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E3F6E020B03A8FB6D',
        image:'/nfts/f123cd1b536d-4159-a3c3-bc85057afa3d1679873e1de9-4051-af59-64.webp',
    },
    {
        id:   '',
        name: 'Specter of Horizons',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E6D39A40903A8FB6F',
        image:'/nfts/cb219d983f22-4130-989a-fd569f94675dddac404ba708-4f89-9d45-5f.webp',
    },
    {
        id:   '',
        name: 'Veil of 589',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E841F750803A8FB70',
        image:'/nfts/563599794ab9-4dcc-96b0-367e0e37e4a832631eb168d9-417f-9c87-83.webp',
    },
    {
        id:   '',
        name: 'The Astral Coffer',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E9B05460F03A8FB71',
        image:'/nfts/34726c14babf-427f-acf3-949d46e17888de3ffc022091-427d-894b-ef.webp',
    },
    {
        id:   '',
        name: 'Echoes of Origin',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692EB1EB170E03A8FB72',
        image:'/nfts/d91a19835911-4213-a507-bb1ed530ffa1fa9e7bfd8a24-4368-a2ce-6a.webp',
    },
    {
        id:   '',
        name: 'Shadowbound Key',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692EC8D0E80D03A8FB73',
        image:'/nfts/1bb59cac5496-4abf-a063-ca839cf08f8d32dfa37169ea-433c-a9d6-69.webp',
    },
    {
        id:   '',
        name: 'Whisper of the Gate',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692EDFB6B90C03A8FB74',
        image:'/nfts/7e9caf46333f-4f08-923e-94d05d5dbd7f5cf495d752ec-48db-a992-0f.webp',
    },
    {
        id:   '',
        name: 'The Celestial Cipher',
        link: '',
        image:'/nfts/c35dd9597bec-4bca-a5f5-36893d0250c95b09c1be7496-4caa-93c5-8b.webp',
    },
    {
        id:   '',
        name: 'Pillar of Enigmas',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692EF69C8A1303A8FB75',
        image:'/nfts/3156ad77ce19-42d0-b41e-6bb8a5c5063d1fc7016e1c4c-4d2a-bb6f-e9.webp',
    },
    {
        id:   '',
        name: 'Ethereal Aegis',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E24682C1103A8FB77',
        image:'/nfts/8ced6feb75cd-4e45-bfcd-0f0089561ebb3d0c47513d84-4f77-a15a-64.webp',
    },
    {
        id:   '',
        name: 'The Rune of Echoes',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E3B4DFD1003A8FB78',
        image:'/nfts/67e6f1c9d43f-4a54-9c9a-1ddb0eb60998ebaf6da66085-4644-95aa-fb.webp',
    },
    {
        id:   '',
        name: 'Reverie 589',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E5233CE1703A8FB79',
        image:'/nfts/4b1ed6e208c2-4cf1-973b-04f85fe8cad4f4f985ca0339-4119-9f30-24.webp',
    },
    {
        id:   '',
        name: 'Watcher in the Gloom',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E69199F1603A8FB7A',
        image:'/nfts/50a43a139056-483d-8608-5c42a274ed98e1d65c260c31-42c2-a046-0e.webp',
    },
    {
        id:   '',
        name: 'Prism of Possibilities',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E7FFF701503A8FB7B',
        image:'/nfts/3156ad77ce19-42d0-b41e-6bb8a5c5063d1fc7016e1c4c-4d2a-bb6f-e9.webp',
    },
    {
        id:   '',
        name: 'The Undisclosed Eye',
        link: 'https://xrp.cafe/nft/00080BB879FD9290A045A8C2C27CDB2BD95B3535CE14692E96E5411403A8FB7C',
        image:'/nfts/76e9fe9594fe-4e7a-91ae-dc68364ffa56e627fc1a2f11-4aac-9f60-d9.webp',
    },
    {
        id:   '',
        name: 'Ethereal Sentinel',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692E6B5F574E03A8FBB2',
        image:'/nfts/82fdcc256bc1-40ab-9420-2a07fcd8f987064ace5f822f-4be0-8ecd-54.webp',
    },
    {
        id:   '',
        name: 'The 589 Keeper',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692E992AF94C03A8FBB4',
        image:'/nfts/6b1a50021817-4ba2-b76d-32123d7e9207b27b8a372cf9-4fd6-9cbf-d8.webp',
    },
    {
        id:   '',
        name: 'The Ledger Sage',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692EB010CA5303A8FBB5',
        image:'/nfts/92afb80b060e-4bd9-8ad0-26f7b78d5ad00773a6b870ee-40c2-a3f7-10.webp',
    },
    {
        id:   '',
        name: '#23 589',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692EC6F69B5203A8FBB6',
        image:'/nfts/565bff2b54bb-4875-a25c-60c640ac8680488114f21af3-42a5-b51d-52.webp',
    },
    {
        id:   '',
        name: 'Lady Ledger',
        link: 'https://xrp.cafe/nft/0008170279FD9290A045A8C2C27CDB2BD95B3535CE14692EDDDC6C5103A8FBB7',
        image:'/nfts/3dfaddee1199-4077-a72a-f91419f4aad395b1500981ac-4b4c-a1f9-cc.webp',
    },

    // …add as many as you like
]
