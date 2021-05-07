import styled from '@emotion/styled'
import axios from 'axios'

import React, {useState} from 'react'
import {IProps} from '../common/types'

export default function RatingsInfo({
    onQuoteReceived,
    quote = {}
}: IProps) {
    const variableOptions = quote.variable_options
    const variableSelections = quote.variable_selections
    
    return(
        <>
          <div>QUOTE</div>
        </>
    )
}
