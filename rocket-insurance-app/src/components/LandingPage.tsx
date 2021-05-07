import styled from '@emotion/styled'

import {useState} from 'react'
import RatingsInfo from './RatingsInfo'
import QuotePage from './QuotePage'
import axios from 'axios'

export default function LandingPage() {
    const [showQuote, updateShowQuote] = useState(false)
    const [quote, updateQuote] = useState({})

    const onQuoteRequested = (newQuote: Record<string, any>) => {
        axios.post(`https://fed-challenge-api.sure.now.sh/api/v1/quotes`, newQuote)
        .then((res) => {
            updateQuote(res.data.quote)
            updateShowQuote(true)
        })
        .catch(err => console.log(err))
    }

    const onQuoteUpdated = (newQuote: Record<string, any>) => {
        // make put request to update quote
        const {quoteId, rating_address, policy_holder, variable_selections} = newQuote
        axios.put(`https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quoteId}`, {
            quote: {
                quoteId,
                rating_address,
                policy_holder,
                variable_selections
            }
        })
        .then(res => updateQuote(res.data.quote))
        .catch(err => console.log(err))
    }

    return(
        <>
          <StyledHeader>
              <div className='header-left'>
                <h1>Rocket Insurance</h1>
                <h1 className='darken-text'>Save up to 27% with a new policy!</h1>
              </div>
              <div className='header-right'>
                <h2>Call 555-555-5555</h2>
                <h2>To get a quote in 5 min</h2>
              </div>
          </StyledHeader>
          {showQuote
          ? <QuotePage quote={quote} onQuoteUpdated={onQuoteUpdated}/>
          : <RatingsInfo onQuoteRequested={onQuoteRequested} />
          }
        </>
    )
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: #00203FFF;
    width: 100%;
    height: 200px;
    color: white;
    font-family: Courier New;

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