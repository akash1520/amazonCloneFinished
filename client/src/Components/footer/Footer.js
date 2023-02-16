import React from 'react'
import './footer.css'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Get to know us</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Science</p>
                </div>
                <div className="footr_details_one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Make Money with Us</h3>
                    <p>Sell on Amazon</p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Protect and Build Your Brand</p>
                    <p>Amazon Global Selling</p>
                    <p>Become an Affiliate</p>
                    <p>Fulfilment by Amazon</p>
                    <p>Advertise Your Products</p>
                    <p>Amazon Pay on Merchants</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Make Money with Us</h3>
                    <p>Sell on Amazon</p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Protect and Build Your Brand</p>
                    <p>Amazon Pay on Merchants</p>
                </div>
            </div>
            <div className="lastdetails">
                    <img src='/amazon_PNG25.png' alt='' />
                    <p>Conditions of Use & Sale &nbsp;&nbsp;&nbsp; Privacy Notice&nbsp;&nbsp;&nbsp;  Interest-Based Ads&nbsp;&nbsp;&nbsp; 
                        © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
                </div>
        </footer>
    )
}
