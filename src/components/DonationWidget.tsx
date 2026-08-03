'use client';

import Image from 'next/image';
import styles from './DonationWidget.module.css';

const UPI_ID = 'shreyashsr2004-1@oksbi';

export default function DonationWidget() {
  return (
    <div className={styles.donationWidgetContainer}>
      <div className={styles.donationHeader}>
        <h3>❤️ Support ihatelovepdf</h3>
        <p>Keep this project thriving 💪</p>
      </div>

      <div className={styles.qrContainer}>
        <p className="text-sm opacity-90 mb-4">Scan with Google Pay, PhonePe, Paytm, or any UPI app</p>
        <div className={styles.qrImageWrapper}>
          <Image
            src="/images/upi-qr.jpeg"
            alt="UPI QR Code"
            width={250}
            height={250}
            className="rounded-xl mx-auto"
            unoptimized
          />
        </div>
        <p className="text-xs font-mono mt-4 opacity-75">{UPI_ID}</p>
      </div>

      <div className={styles.donationMessage}>
        ✨ 100% of your donation goes directly to support development & maintenance.
        <br />
        No processing fees. Direct UPI transfer. 🙏
      </div>

      <div className={styles.donationFooter}>
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        Secure UPI Payment
      </div>
    </div>
  );
}
