import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container  p-10 `,
    topContent: `flex  flex-wrap justify-center items-center  gap-10 `,
    nftImgContainer: `flex min-w-[320px] w-[30%] justify-center items-center px-3`,
    detailsContainer: `flex min-w-[320px] w-[60%] justify-between flex-col px-3 `,
}

const Nft = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner())
        return sdk.getNFTModule('0x93C2da7448ee1cBbBBBF86f9A1BCC730b188bE8F')
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
            ; (async () => {
                const nfts = await nftModule.getAll()

                const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

                setSelectedNft(selectedNftItem)
            })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner())

        return sdk.getMarketplaceModule('0xdb308805b4F7545E049D05CD7CEaCc2CD5717E3d')
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAllListings())
            })()
    }, [marketPlaceModule])

    return (
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                isListed={router.query.isListed}
                                selectedNft={selectedNft}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                        <ItemActivity />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Nft