import styled from '@emotion/styled'

import React, {useState} from 'react'

export default function LandingPage() {
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [address, updateAddress] = useState({
        address1: '',
        address2: '',
        city: '',
        region: '',
        zipcode: ''
    })

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

    const handleSubmit = async () => {
        const quote = await fetch('/api/getQuote', {
            key: 'test',
            foo: 'bar'
        })
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
          <StyledBody>
            <h2>We need a few pieces of information to get your quote!</h2>
            <StyledForm onSubmit={handleSubmit}>
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
                    <input name='address2' placeholder='Apt 1' value={address.address2} onChange={handleAddressChange}></input>
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
                <input className='submit-button' type='submit' value='Get Quote'></input>
            </StyledForm>
          </StyledBody>
        </>
    )
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: #0033a0;
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

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;

    // background-image: url('https://farmersinsurance.scene7.com/is/image/farmers/auto-landing-2000x714__10-9-2020?&2000,768,480');
`

const StyledForm = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    background: lightblue;
    border-radius: 10px;
    -moz-box-shadow:    inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow:         inset 0 0 10px #000000;

    .label-input-group {
        margin-top: 10px;

        label {
            display: inline-block;
            width: 120px;
        }
    }
    input {
        width: 20rem;
        background: #F2F1F9;
        border: none;
        padding: 0.5rem;
    }

    .submit-button {
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        background: #4CAF50;
        color: white;
        font-size: 16px;
        height: 50px;
        width: 200px;
        cursor: pointer;
    }
`
