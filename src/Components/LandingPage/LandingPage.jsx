import React, { useState, useEffect, allPaymentDetails } from 'react'
import fetchUtil from '../../Functions/fetchUtils'
import './LandingPage.scss'
import { connect } from 'react-redux'
import { BlockLoading } from 'react-loadingg'
import { v4 as uuidv4 } from 'uuid'

const UnconnectedLandingPage = ({ history, dispatch, allPaymentDetails }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchAllPaymentDetails = async () => {
      let response = await fetchUtil('/payments/details', 'GET', '')

      if (response.success) {
        dispatch({
          type: 'set-allPaymentDetails',
          value: response.data,
        })
        setIsLoading(false)
      } else {
        console.log(response.message)
        setIsLoading(false)
      }
    }

    fetchAllPaymentDetails()
  }, [])

  return isLoading ? (
    <div className='quote-preview-wrapper-loader'>
      <BlockLoading color='#FF4E24' />
    </div>
  ) : (
    <section className='payments-landing-page'>
      <h1>All Payments</h1>
      <div className='landing-page-wrapper'>
        <table className='landing-page-payments-container'>
          {allPaymentDetails.map((paymentDetails) => {
            return (
              <div key={uuidv4()} className='landing-page-payment'>
                <div
                  className='payment-id'
                  title={`View Payment Details`}
                  onClick={() =>
                    history.push('/generate?pid=' + paymentDetails.paymentID)
                  }
                >
                  {paymentDetails.paymentID}
                </div>
                <p className='payee-name'>{paymentDetails.payerName}</p>
                <p className='payment-details'>{paymentDetails.description}</p>
              </div>
            )
          })}
        </table>
      </div>
    </section>
  )
}

let mapStateToProps = (state) => {
  return {
    allPaymentDetails: state.allPaymentDetails,
  }
}

let LandingPage = connect(mapStateToProps)(UnconnectedLandingPage)
export default LandingPage
