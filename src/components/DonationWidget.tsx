'use client';

import React, { useState, KeyboardEvent } from 'react';
import styles from './DonationWidget.module.css';

const UPI_CONFIG = {
  UPI_ID: 'shreyashsr2004-1@oksbi',
  PAYEE_NAME: 'Shreyash Srivastava',
  PROJECT_NAME: 'ihatelovepdf',
};

export default function DonationWidget() {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const buildUPIString = (amount: number) => {
    const params = new URLSearchParams({
      pa: UPI_CONFIG.UPI_ID,
      pn: UPI_CONFIG.PAYEE_NAME,
      am: amount.toString(),
      tn: `Support ${UPI_CONFIG.PROJECT_NAME}`,
      tr: `DONATION_${Date.now()}`,
    });

    return `upi://pay?${params.toString()}`;
  };

  const donateViaUPI = (amount: number) => {
    const upiURL = buildUPIString(amount);
    window.location.href = upiURL;
    showSuccessMessage();
  };

  const donateCustom = () => {
    const amount = parseInt(customAmount);

    if (!amount || amount < 1) {
      alert('❌ Please enter a valid amount');
      return;
    }

    donateViaUPI(amount);
    setCustomAmount('');
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      donateCustom();
    }
  };

  return (
    <div className={styles.donationWidgetContainer}>
      <div className={styles.donationHeader}>
        <h3>❤️ Support ihatelovepdf</h3>
        <p>Keep this project thriving 💪</p>
      </div>

      <div className={styles.donationAmounts}>
        <button className={styles.donationBtn} onClick={() => donateViaUPI(100)}>
          ☕ ₹100
        </button>
        <button className={styles.donationBtn} onClick={() => donateViaUPI(500)}>
          🎯 ₹500
        </button>
        <button className={styles.donationBtn} onClick={() => donateViaUPI(1000)}>
          🚀 ₹1000
        </button>
        <button className={styles.donationBtn} onClick={() => donateViaUPI(2000)}>
          💎 ₹2000
        </button>
      </div>

      <div className={styles.customDonationGroup}>
        <input
          type="number"
          className={styles.customAmountInput}
          placeholder="Custom amount (₹)"
          min="1"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className={styles.donationBtn} onClick={donateCustom} style={{ flex: 0.8 }}>
          💰 Donate
        </button>
      </div>

      <div className={styles.donationMessage}>
        ✨ 100% of your donation goes directly to support development & maintenance.
        <br />
        No processing fees. Direct UPI transfer. 🙏
      </div>

      {showSuccess && (
        <div className={styles.donationSuccess}>
          ✅ Thank you for your generous support! 🎉
        </div>
      )}

      <div className={styles.donationFooter}>
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        Secure UPI Payment
      </div>
    </div>
  );
}
