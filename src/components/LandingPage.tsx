import styled from '@emotion/styled'
import axios from 'axios'

import {useState} from 'react'
import RatingsInfo from './RatingsInfo'
import QuotePage from './QuotePage'
import RocketLogo from '../assets/RocketLogo.png'

export default function LandingPage() {
    const [showQuote, updateShowQuote] = useState(false)
    const [quote, updateQuote] = useState({})
    const [isFetching, updateIsFetching] = useState(false)


    const onQuoteRequested = (newQuote: Record<string, any>) => {
        updateIsFetching(true)
        axios.post(`https://fed-challenge-api.sure.now.sh/api/v1/quotes`, newQuote)
        .then((res) => {
            updateQuote(res.data.quote)
            updateIsFetching(false)
            updateShowQuote(true)
        })
        .catch(err => console.log(err))
    }

    const onQuoteUpdated = (newQuote: Record<string, any>) => {
        // make put request to update quote
        const {quoteId, rating_address, policy_holder, variable_selections} = newQuote
        updateIsFetching(true)
        axios.put(`https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quoteId}`, {
            quote: {
                quoteId,
                rating_address,
                policy_holder,
                variable_selections
            }
        })
        .then(res => {
            updateQuote(res.data.quote)
            updateIsFetching(false)
        })
        .catch(err => console.log(err))
    }

    return(
        <>
          <StyledHeader>
              <img src={RocketLogo} alt='rocket'/>
              <div className='info-group'>
                <p>Call: 555-555-5555</p>
                <p>Email: help@rocketinsurance.com</p>
              </div>
          </StyledHeader>
          {showQuote
          ? <QuotePage isFetching={isFetching} quote={quote} onQuoteUpdated={onQuoteUpdated}/>
          : <RatingsInfo isFetching={isFetching} onQuoteRequested={onQuoteRequested} />
          }
        </>
    )
}

const StyledHeader = styled.div`
    display: flex;
    background: #00203FFF;
    width: 100%;
    height: 180px;
    color: white;
    font-family: Courier New;

    .info-group {
        margin-left: 20px;
        font-size: 18px;
    }
    .header-left {
        padding-left: 20px;
        .darken-text {
            color: rgb(69, 188, 229);
        }
    }
    .header-right {
        padding-right: 20px;
    }
`