import styled from '@emotion/styled'

import {useEffect, useState} from 'react'
import {IQuotePageProps} from '../common/types'

export default function QuotePage({
    onQuoteUpdated,
    quote = {}
}: IQuotePageProps) {
    // Get options for dropdowns
    const variableOptions: Record<string, any> = quote.variable_options
    const deductibleOptions: number[] = variableOptions.deductible.values
    const collisionOptions: number[] = variableOptions.asteroid_collision.values

    // Get state values 
    const variableSelections = quote.variable_selections
    const [selectedDeductible, updateSelectedDeductible] = useState(variableSelections.deductible)
    const [selectedCollision, updateSelectedCollision] = useState(variableSelections.asteroid_collision)
    const currentPremium = quote.premium

    // Get updated quote anytime selected values changes
    useEffect(() => {
        const newQuote = {
            ...quote,
            variable_selections: {
                deductible: parseInt(selectedDeductible),
                asteroid_collision: parseInt(selectedCollision)
            }
        }

        onQuoteUpdated(newQuote)
    }, [selectedCollision, selectedDeductible])
    return(
        <>
          <StyledBody>
            <h2>Here's a custom quote just for you, {quote.policy_holder.first_name}!</h2>
            <StyledQuote>
                <div className='quote-group'>
                    <label>Deductible: </label>
                    <select className='select' value={selectedDeductible} onChange={(e) => updateSelectedDeductible(e.target.value)}>
                        {deductibleOptions.map((option) => {
                            return <option key={option} value={option}>{option}</option>
                        })}
                    </select>
                </div>
                <div className='quote-group'>
                    <label>Collision: </label>
                    <select className='select' value={selectedCollision} onChange={(e) => updateSelectedCollision(e.target.value)}>
                        {collisionOptions.map((option) => {
                            return <option key={option} value={option}>{option}</option>
                        })}
                    </select>
                </div>
                <div className='premium-group'>
                    <label>Annual Premium: </label>
                    <span>${currentPremium}</span>
                </div>
            </StyledQuote>
          </StyledBody>
        </>
    )
}

const StyledQuote = styled.div`
    margin: auto;
    margin-top: 20px;
    background: #00203FFF;
    color: rgb(69, 188, 229);
    border-radius: 10px;
    width: 500px;
    height: 300px;
    padding: 25px;
    -moz-box-shadow:    inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow:         inset 0 0 10px #000000;

    .quote-group, .premium-group  {
        display: flex;
        font-size: 25px;
        margin-top: 20px;
        label {
            width: 200px;
            
        }
    }

    .premium-group {
        margin-top: 100px;
    }

    select {
        appearance: none;
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        z-index: 1;
        outline: none;
    }

    .select {
        display: grid;
        grid-template-areas: "select";
        align-items: center;
        position: relative;
        margin-top: -2px;

        select,
        &::after {
            grid-area: select;
        }

        min-width: 15ch;
        max-width: 30ch;

        border: 1px solid var(--select-border);
        border-radius: 0.25em;
        padding: 0.25em 0.5em;

        font-size: 1.25rem;
        cursor: pointer;
        line-height: 1.1;
        background-color: #fff;
        background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

        &:not(.select--multiple)::after {
            content: "";
            justify-self: end;
            width: 0.8em;
            height: 0.5em;
            background-color: var(--select-arrow);
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        }
    }
}
`

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
`