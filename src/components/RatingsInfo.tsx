import styled from '@emotion/styled'

import React, {useCallback, useEffect, useState} from 'react'
import {IRatingsInfoProps} from '../common/types'


export default function RatingsInfo({
    onQuoteRequested,
    isFetching
}: IRatingsInfoProps) {
    const [firstName, updateFirstName] = useState('')
    const [lastName, updateLastName] = useState('')
    const [address, updateAddress] = useState({
        address1: '',
        address2: '',
        city: '',
        region: '',
        zipcode: ''
    })
    const [isFormError, updateIsFormError] = useState(false)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if (name === 'firstName') {
            updateFirstName(value)
        } else {
            updateLastName(value)
        }
    }

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        const newAddress = {
            ...address,
            [name]: value
        }
        updateAddress(newAddress)
    }

    const validateForm = useCallback(() => {
        const fields: string[] = [firstName, lastName, ...Object.values(address)]
        const filtered: string[] = fields.filter(field => !field)
        const noSecondAddress = filtered.length === 1 && !address.address2

        // Verify no field is an empty stringd unless it's address line 2
        return filtered.length === 0 || noSecondAddress
    }, [firstName, lastName, address])

    const checkError = useCallback(() => {
         if (isFormError && validateForm()) {
            updateIsFormError(false)
        }
    }, [isFormError, validateForm])

    useEffect(() => {
        checkError()
    }, [firstName, lastName, address, checkError])

    const handleSubmit =  () => {
        const formIsValid = validateForm()
        if (formIsValid) {
            const {address1, address2, city, region, zipcode} = address

            onQuoteRequested({
                first_name: firstName,
                last_name: lastName,
                address: {
                    line_1: address1,
                    line_2: address2,
                    city: city,
                    region: region,
                    postal: zipcode
                }
            })
        } else {
            updateIsFormError(true)
        }
    }

    return(
        <>
          <StyledBody>
            {!isFetching && <h2>We need a few pieces of information to get your quote!</h2>}
            {isFormError && 
            <StyledError className='error-message'>You must fill out all required fields to get a quote</StyledError>
            }
            {isFetching 
            ? <span>Fetching Quote...</span>
            : <StyledForm onSubmit={handleSubmit}>
                <div className='label-input-group'>
                    <label>First Name:</label>
                    <input name='firstName' placeholder='John' value={firstName} onChange={handleNameChange}></input>
                </div>
                <div className='label-input-group'>
                    <label>Last Name:</label>
                    <input name='lastName' placeholder='Smith' value={lastName} onChange={handleNameChange}></input>
                </div>
                <div className='label-input-group'> 
                    <label>Address Line 1:</label>
                    <input name='address1' placeholder='123 Main St' value={address.address1} onChange={handleAddressChange} ></input>
                </div>
                <div className='label-input-group'>
                    <label>Address Line 2:</label>
                    <input name='address2' placeholder='Optional' value={address.address2} onChange={handleAddressChange}></input>
                </div>
                <div className='label-input-group'>
                    <label>City:</label>
                    <input name='city' placeholder='Dallas' value={address.city} onChange={handleAddressChange}></input>
                </div>
                <div className='label-input-group'>
                    <label>Region:</label>
                    <input name='region' placeholder='TX' onChange={handleAddressChange}></input>
                </div>
                <div className='label-input-group'>
                    <label>Zip Code:</label>
                    <input name='zipcode' placeholder='12345' value={address.zipcode} onChange={handleAddressChange}></input>
                </div>
                <input className='submit-button' type='button' value='Get Quote' onClick={handleSubmit}></input>
            </StyledForm>
            }
          </StyledBody>
        </>
    )
}

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
`

const StyledForm = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    background: #ADEFD1FF;
    color: #00203FFF;
    border-radius: 10px;
    -moz-box-shadow:    inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow:         inset 0 0 10px #000000;

    .label-input-group {
        margin-top: 10px;

        label {
            display: inline-block;
            width: 120px;
            font-weight: bold;
        }
    }
    input {
        width: 20rem;
        background: #F2F1F9;
        border: none;
        padding: 0.5rem;
        border-radius: 10px;
    }

    .submit-button {
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        background: #00203FFF;
        font-weight: bold;
        color: #ADEFD1FF;
        font-size: 16px;
        height: 50px;
        width: 200px;
        cursor: pointer;
        border: 2px solid white;

        :hover {
            border: 3px solid orange;
        }
    }
`

const StyledError = styled.div`
    color: #dc3545;
   font-size: 20px;
`