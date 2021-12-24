import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingPage from '../../../../components/LoadingBox'
import Pagination from '../../../../components/Pagination'
import Modal from '../../../../components/Modal/Modal'
import { EtherContext } from '../../Context'
import RankingItem from './RankingItem'

let fetchDataInterval

const RankingPanel = () => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const [error, setError] = useState(false)
  const [hasNotNFT, setHasNotNFT] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
  })

  const {
    loggedIn,
    nftContractAddress,
    showRanking,
    tokenId,
    sortByOrder,
    showPerPage,
    page,
    totalCount,
    setPage,
    setShowRanking,
    setPageOptions,
    setTotalCount,
  } = useContext(EtherContext)

  useEffect(() => {
    if (!nftContractAddress) return
    if (loggedIn && showRanking) {
      fetchCollection()
    }

    if (error) {
      toast.error(error, {
        appearance: 'error',
      })
    }
  }, [loggedIn, showRanking])

  const fetchDataUrl = async (account) => {
    try {
      const param = {
        walletAddress: account,
        signature: sessionStorage.getItem('signature'),
        contractAddress: nftContractAddress,
        force: false,
      }

      const result = await axios.post(
        'https://api.xflipper.io/collection',
        param,
      )

      const { status, statusCode, message } = result.data

      if (statusCode === 404 || statusCode === 500 || status === 'error') {
        setHasNotNFT(true)
        setErrorMessage({
          title: 'Error',
          description: `You don't have needed NFT token in your wallet`,
        })
        return null
      }
      setHasNotNFT(false)

      return result.data
    } catch (e) {
      setErrorMessage({
        title: 'Not found',
        description: `Started rescrapping`,
      })
      setHasNotNFT(true)
    }
  }

  const fetchCollection = async () => {
    setLoading(false)
    clearInterval(fetchDataInterval)

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const result = await fetchDataUrl(accounts[0])
      const { status, dataUrl, message } = result
      // if (status === 'error') {
      //   toast.error(message, {
      //     appearance: 'error',
      //   });
      // }

      if (status !== 'ready') {
        setLoading(true)

        fetchDataInterval = setInterval(async () => {
          const { status, dataUrl, message } = await fetchDataUrl(accounts[0])

          if (status === 'ready') {
            clearInterval(fetchDataInterval)
            fetchCollectionData(dataUrl)
            setLoading(false)
          } else if (status === 'error') {
            clearInterval(fetchDataInterval)
            setLoading(false)
            setError(message)
          }
        }, 5000)
      } else {
        fetchCollectionData(dataUrl)
      }
    } catch (e) {
      console.error(e.message)
    } finally {
      setShowRanking(false)
    }
  }

  const fetchCollectionData = async (dataUrl) => {
    try {
      setLoading(true)
      const result = await axios.request(dataUrl, {
        headers: {
          accept: '*/*',
        },
      })

      setResponse(result.data)
    } catch (e) {
      toast.error(e.message, {
        appearance: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSignatureBtn = () => {
    setHasNotNFT(false)
  }

  useEffect(() => {
    async function fetchData(token_ids, limit) {
      let req = "";
      token_ids.forEach((id, index) => {
        req = req + "token_ids=" + id;
        if(index < token_ids.length-1) {
          req += "&";
        }
      })
      req += `&asset_contract_address=0x9A534628B4062E123cE7Ee2222ec20B86e16Ca8F&limit=${limit}`;
      return await axios
      .request(
        `https://api.opensea.io/api/v1/assets?${req}`,
        {
          headers: {
            accept: '*/*',
          },
        }
      ).then(async (res) => {
        return res.data.assets;
      }).catch((error) => {
        console.log(error);
      });
    }

    if (loggedIn) {
      const firstPageIndex = (parseInt(page) - 1) * parseInt(showPerPage)
      const lastPageIndex = firstPageIndex + parseInt(showPerPage)
      let tempNFTs = []
      if (response) {
        tokenId && setPage('1')

        tempNFTs = tokenId
          ? response.filter((nft) => {
              return nft.token_id === '' + tokenId
            })
          : response

        setTotalCount(tempNFTs.length)
        setPageOptions(
          Array.from(
            { length: Math.ceil(tempNFTs.length / parseInt(showPerPage)) },
            (_, i) => (i + 1).toString(),
          ),
        )

        switch (sortByOrder) {
          case 'Rank-High to Low':
            tempNFTs = tempNFTs.slice(firstPageIndex, lastPageIndex)
            break
          case 'Rank-Low to High':
            tempNFTs = tempNFTs
              .slice()
              .reverse()
              .slice(firstPageIndex, lastPageIndex)
            break
          default:
            break
        }
        // setNfts(tempNFTs)
        let token_ids = [];
        token_ids = tempNFTs.map((nft, index) => nft.token_id);

        fetchData(token_ids, showPerPage).then((res) => {
          for (let i = 0 ; i < tempNFTs.length ; i++) {
            let temp_sell_order;
            let temp_owner;
            for(let j = 0 ; j < res.length ; j++) {
              if(res[j].token_id === tempNFTs[i].token_id){
                temp_sell_order = res[j].sell_orders;
                temp_owner = res[j].owner;
                break;
              }
            }
            tempNFTs[i].sell_orders = temp_sell_order;
            tempNFTs[i].owner = temp_owner;
          }
          setNfts(tempNFTs)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }, [
    loggedIn,
    response,
    error,
    loading,
    page,
    tokenId,
    sortByOrder,
    showPerPage,
    page,
  ])

  const handlePageChange = async (page) => {
    await setPage('' + page)
  }

  return (
    <>
      <div className='ranking-panel'>
        {loading ? (
          <>
            <div className='loader-text'>
              We are analyzing the data, it will take less than 60 seconds.
              <br /> It's still faster than Windows update.
            </div>
            <LoadingPage className='loader' />
          </>
        ) : (
          <>
            <div className='nft-panel'>
              {nfts && nfts.length > 0 &&
                nfts.map((nft, index) => {
                  console.log(nft)
                  return (
                    <RankingItem
                      token_id={nft.token_id}
                      name={nft.name}
                      image={nft.image_url}
                      score={Math.round(nft.score * 100) / 100}
                      eth={(nft.score / 10000).toFixed(4)}
                      traits={nft.traits.sort((a, b) => b.score - a.score)}
                      rank={nft.rank}
                      delay={index * 500}
                      key={nft.token_id}
                      collectionID={nftContractAddress}
                      owner = {nft.owner}
                      sell_orders = {nft.sell_orders}
                    />
                  )
                })}
            </div>
            {nfts && (
              <Pagination
                className='pagination-bar'
                currentPage={parseInt(page)}
                totalCount={totalCount}
                pageSize={parseInt(showPerPage)}
                onPageChange={(page) => {
                  setTimeout(() => handlePageChange(page), 1000)
                }}
              />
            )}
          </>
        )}
      </div>
      {hasNotNFT && (
        <Modal
          message={errorMessage.title}
          description={errorMessage.description}
          handleCloseBtn={handleCloseSignatureBtn}
        ></Modal>
      )}
    </>
  )
}

export default RankingPanel
