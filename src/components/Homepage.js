import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [wallets, setWallets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch wallets dynamically
  useEffect(() => {
    const fetchWallets = async () => {
      const walletData = [
        { name: 'WalletConnect', image: 'https://th.bing.com/th/id/OIP.LDB7V-k4tzi7pNULZjxV2AHaHa?rs=1&pid=ImgDetMain' },
        { name: 'TrustWallet', image: 'https://th.bing.com/th/id/R.29e40a638caf8860544c9515311f5829?rik=w0DytJ80SDJUuQ&pid=ImgRaw&r=0&sres=1&sresct=1' },
        { name: 'CoinBase', image: 'https://th.bing.com/th/id/OIP.8IcNT5YRt9iJ1LQlv7a_6AAAAA?w=167&h=180&c=7&r=0&o=5&pid=1.7' },
        { name: 'Metamask', image:'https://th.bing.com/th/id/R.7b3c65cab46a694bbbe8a1e591c690ca?rik=1P5B298Y5XNyXA&pid=ImgRaw&r=0'},
        { name: 'PhantomWallet', image: 'https://th.bing.com/th/id/R.e9e434cce6c393b90f0f5167b22bb401?rik=pEyllJy7f%2bRSBw&pid=ImgRaw&r=0' },
        { name: 'BinaceWallet', image: 'https://th.bing.com/th/id/OIP.nj2vxizDvpA3e92EeLmx1gHaHa?w=152&h=180&c=7&r=0&o=5&pid=1.7' },
        { name: 'LedgerLive', image: ' https://th.bing.com/th/id/R.6e85124bb4847bb90c01d6fa28c7f46b?rik=ScqWZ%2bAqC%2fNTRw&pid=ImgRaw&r=0 ' },
        { name: 'BinanceChain', image:'https://th.bing.com/th/id/R.b5a961545c101ba71bc9638bb61a6304?rik=6lgR3oXyHyWo0Q&pid=ImgRaw&r=0'},
        { name: 'tron', image:'https://th.bing.com/th/id/R.de3064d6f2b2153aacb6a854038c3a79?rik=AgIqCKNLaE5OuQ&pid=ImgRaw&r=0'},
        { name: 'Bitget', image: 'https://vip3rightfiles.s3.amazonaws.com/1695796302433_bitget%20wallet%206.jpg' },
        { name: 'myceluim', image: 'https://external-preview.redd.it/1VC8zOqFTLicAGTshp_Z5-vpbRSVQ-K3NZYPP43EWGY.jpg?auto=webp&s=945d800ba5be8fd074b4ba6c70d4399d8ffc534a' },
        { name: 'ExodusWallet', image: 'https://walletscrutiny.com/images/wIcons/android/exodusmovement.exodus.png' },
        { name: 'SolarWallet', image: 'https://www.yadawallets.com/wp-content/uploads/2020/10/solar-wallet-logo.png' },
        { name: 'MonerujoWallet', image: 'https://th.bing.com/th/id/OIP.vmTDOeny6QPQXngfxihvCwAAAA?pid=ImgDet&w=150&h=150&c=7' },
   
        { name: 'BitBox02', image: 'https://th.bing.com/th/id/OIP.E9OMEWOylF70Ai5CX1GbBQAAAA?rs=1&pid=ImgDetMain' },
        { name: 'loopring', image: 'https://th.bing.com/th/id/OIP.MPOcdfxbkOv4-qpGJuP1-wHaHa?rs=1&pid=ImgDetMain'},
        { name: 'oneKey',image:'https://dashboard.snapcraft.io/site_media/appmedia/2023/03/onekey_icon_default_solid_green_black.png'},
        { name: 'zengo',image:'https://th.bing.com/th/id/OIP.4WpZuqTcDjNxSkhA0T6wfwHaHa?pid=ImgDet&w=191&h=191&c=7'},
        { name: 'safepal',image:'https://play-lh.googleusercontent.com/uT6ByyNvUeLRMDnMKEC91RrbHftl2EBB58r9vZaNbiYf1F5Twa33_Hx0zYvEfCtiG1kE'},
        { name: 'GuardaWallet',image:'https://coingape.com/wp-content/uploads/2023/02/Guarda-Wallet-crypto-logo.jpg'},
        { name: 'Bitcoin.com',image:'https://hebeswap.com/assets/images/tokenpocket.png'},
        { name: 'TonWallet',image:'https://play-lh.googleusercontent.com/6pFt0ZTN9m3cBO4gar8EJqsZSWm_DGEttLgVZqmTg4k-JMYggcYbpoLILsRPe7JEjJPw'},
        { name: 'Tonkeeper',image:'https://th.bing.com/th/id/R.2acdb8a1586f5150079f476352c55200?rik=u9lLh29HaE07nw&pid=ImgRaw&r=0'},
        { name: 'suiWallet',image:'https://assets-cdn.trustwallet.com/blockchains/sui/info/logo.png'},
        { name: 'keepKey',image:'https://th.bing.com/th/id/OIP.59TazK6AL8-VezEBSrn0ogAAAA?rs=1&pid=ImgDetMain'},
        { name: 'Elipal',image:'https://th.bing.com/th/id/R.fe3f20be4a3393d9d6889b0b1b88fe45?rik=UOvFUrrg55GEuw&pid=ImgRaw&r=0'},
        { name: 'Argent',image:'https://th.bing.com/th/id/R.3c55995645af676986b03c53e2a486eb?rik=JJlclL01aHaW%2bQ&pid=ImgRaw&r=0&sres=1&sresct=1'},
        { name: 'Youhodler',image:'https://th.bing.com/th/id/OIP.PvVZ4eC8Jdk00RG6-HXRVQHaHa?rs=1&pid=ImgDetMain'},
        { name: 'Bitbox',image:'https://th.bing.com/th/id/OIP.5pA8tHPf9yNgY0AtuWiCngAAAA?rs=1&pid=ImgDetMain'},
        { name: 'ColdCardWallet',image:'https://th.bing.com/th/id/OIP.yBtNVIN4L0x2G077vF_J7gAAAA?rs=1&pid=ImgDetMain'},
        { name: 'Keystone',image:'https://th.bing.com/th/id/OIP.pFwEMEZ4YwfwPshRO0r7KQHaHa?rs=1&pid=ImgDetMain'},
        { name: 'simpleHold',image:'https://th.bing.com/th/id/OIP.wgkQ5U53ZxphVgMvAB5_zgHaHa?rs=1&pid=ImgDetMain'},
        { name: 'MyEther',image:'https://th.bing.com/th/id/OIP.al2XlaGbW6QLBGeM35arVwAAAA?rs=1&pid=ImgDetMain'},
        { name: 'Infiniti',image:'https://www.yadawallets.com/wp-content/uploads/2021/01/infinitywallet-logo.png'},
        { name: 'coinspace',image:'https://th.bing.com/th/id/R.d63cba41d08c7058233184bf9006c048?rik=cyna3433EsIEgA&pid=ImgRaw&r=0'},
        { name: 'coolWallet',image:'https://play-lh.googleusercontent.com/Fh6qQqnzTc1PctcLekAHWG2WqnzCFbAwGYEdA48rVdwAso5Ws4CCe54IUylGEb-F8I8'},
        { name: 'Ambire',image:'https://th.bing.com/th/id/R.eb244ebdebdc0b01a6b7d5e922bb496a?rik=VUubPyPO2ETdDA&pid=ImgRaw&r=0'},
        { name: 'Bitpay',image:'https://th.bing.com/th/id/OIP.XI-Q1z0LeLagao_OpF_Z9wHaHa?rs=1&pid=ImgDetMain'},
        { name: 'stakedWallet.io',image:'https://th.bing.com/th/id/OIP.6R85mq7B8tUE5ahZCWdenAHaJP?rs=1&pid=ImgDetMain'},
        { name: 'coinjar', image:'https://th.bing.com/th/id/OIP.BkNDLH6BYDXQ4GgKPeP0gQHaHa?rs=1&pid=ImgDetMain'},
        { name: 'Arculus', image:'https://th.bing.com/th/id/OIP.wLpK7GHNAdyrjWfGWglc_AHaHa?rs=1&pid=ImgDetMain'},
        { name: 'BrdWallet', image:'https://th.bing.com/th/id/R.e4bca3c3a24d0a0c33d77bd78827890b?rik=nk7bW0X%2fKMEd7g&pid=ImgRaw&r=0'},
        { name: 'Kepir', image:'https://th.bing.com/th/id/OIP.Zc96QHs8Fg6hM6hslAkFUQHaD4?rs=1&pid=ImgDetMain'},
        { name: 'TerraStation', image:'https://th.bing.com/th/id/OIP.VqM-YnMPREOE0eUjXXXRtwAAAA?w=167&h=180&c=7&r=0&o=5&pid=1.7'},
        { name: 'solflare', image:'https://th.bing.com/th/id/R.b3a9cdda502849b97c02ad9bf0a82608?rik=OwyMcdPYHEX8AA&pid=ImgRaw&r=0'},
        { name: 'uniswap', image:'https://th.bing.com/th/id/OIP.yAk3_dCYKwMxR7c858CKDQHaIh?rs=1&pid=ImgDetMain'},
        { name: 'TangemWallet', image:'https://th.bing.com/th/id/OIP.nMS5saZq_6D5d2_LHELy5QHaHa?rs=1&pid=ImgDetMain'},
        { name: 'Kaspium', image:'https://th.bing.com/th/id/OIP.K-v7Oi70AD61Vok9Cu9qEAAAAA?rs=1&pid=ImgDetMain'},
        { name: 'Kraken', image:'https://th.bing.com/th/id/R.89f13bb258c379d902f864f65e00c60c?rik=cPf4pF4WpY%2bwVw&pid=ImgRaw&r=0&sres=1&sresct=1'},
        { name: 'Zerion', image:'https://play-lh.googleusercontent.com/lxl3CQLYmbY7kHtMn3ehz06ebEIIxYOETf8hlWPNW6L3ZPxuhSrnIq-4k5T89gd4gA'},
        { name: 'Atomic', image:'https://th.bing.com/th/id/R.c64db94aba77d0abfdaf722393f36ab5?rik=%2bDmZclEAhV5pGg&pid=ImgRaw&r=0'},
        { name: 'coinomi', image:'https://th.bing.com/th/id/R.9cca691f9fa9d1eb9a103e1010c32336?rik=uZ7YwxnChuuRSQ&pid=ImgRaw&r=0'},
        { name: 'ronin', image:'https://th.bing.com/th/id/R.27a6a1106f4dfec0015d4fbbf92bd45b?rik=WhSXWefTInqVRA&pid=ImgRaw&r=0'},
        { name: 'TezosWallet', image:' https://th.bing.com/th/id/OIP.wGV8LMtEq3xdG6_QWiL1RQHaD7?rs=1&pid=ImgDetMain '},
        { name: 'Electrum', image:'https://munix.dk/sites/default/files/styles/tutorial_/public/electrum-logo.png?itok=kukhBugC'},
        { name: 'safeMoon', image:'https://www.business2community.com/wp-content/uploads/2022/04/safemoon.png'},
        { name: 'YorioWallet', image:'https://th.bing.com/th/id/OIP.zpCNFGFGllcYDhKdrPp0sQAAAA?rs=1&pid=ImgDetMain'},
        { name: 'Crypto.com', image:'https://th.bing.com/th/id/OIP.YS7tB4p9TKTuazSzPO0migHaHa?rs=1&pid=ImgDetMain'},
        { name: 'EternlWallet', image:'https://th.bing.com/th/id/OIP.wu4rEvHSYc6owNXPEM-QzwHaHa?rs=1&pid=ImgDetMain'},
        { name: 'FlintWallet', image:'https://th.bing.com/th/id/OIP.SclMOGTJfZsuXoBraW9CtQHaEK?rs=1&pid=ImgDetMain'},
        { name: 'TrezorWallet', image:'https://crypto-central.io/library/uploads/Trezor-Logo.png'},
        { name: 'Aave', image:'https://th.bing.com/th/id/OIP.dXfNKL2wy5-34KegFGU9JQHaEJ?rs=1&pid=ImgDetMain'},
        { name: 'Digitex', image:'https://th.bing.com/th/id/OIP.ysUbZJjB62BwGCJofARyhAAAAA?w=225&h=225&rs=1&pid=ImgDetMain'},
        { name: 'Ledger', image:'https://th.bing.com/th/id/OIP.qF5yqMYOcE5yU_8Xk-W-wAAAAA?rs=1&pid=ImgDetMain'},
        { name: 'LeapWallet', image:'https://th.bing.com/th/id/OIP.HLMHb3i7fdMAaA0l8_-0hgHaHa?rs=1&pid=ImgDetMain'},
        { name: 'HeliumWallet', image:'https://th.bing.com/th/id/OIP.S0wQOy1VBLVMvrIbGVNX3QHaEc?rs=1&pid=ImgDetMain'},
        { name: 'linchWallet', image:' https://th.bing.com/th/id/R.95bf06d513ed7ae2ea7ee2457a8daf91?rik=IfsTHJ7lZxWswQ&pid=ImgRaw&r=0'},
        { name: 'Huobi', image:'https://www.yadawallets.com/wp-content/uploads/2020/12/Huobi-wallet-logo.png'},
        { name: 'kyberSwap', image:'https://th.bing.com/th/id/OIP.CW899l-QKfpA2VydhpNcagHaHa?rs=1&pid=ImgDetMain'},
       
        
        // Add more wallet objects
      ];

      // Repeat wallets to simulate 71 unique wallets (use unique names and images)
      for (let i = 13; i <= 10; i++) {
        walletData.push({
          name: `Wallet${i}`,
          image: `https://via.placeholder.com/150?text=Wallet${i}`
        });
      }

      // Remove duplicates by wallet name
      const uniqueWallets = Array.from(
        new Map(walletData.map((wallet) => [wallet.name, wallet])).values()
      );

      setWallets(uniqueWallets);
    };

    fetchWallets();
  }, []);

  // Navigate to the wallet connection page
  const handleWalletClick = (walletName) => {
    navigate(`/connect/${walletName}`);
  };

  // Filter wallets based on search input
  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Connect Wallet</h1>
      <p>Open protocol for connecting wallets to dApps</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search wallet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="wallet-grid">
        {filteredWallets.map((wallet, index) => (
          <div
            key={index}
            className="wallet-card"
            onClick={() => handleWalletClick(wallet.name)}
          >
            <img
              className="wallet-image"
              src={wallet.image}
              alt={wallet.name}
              style={{ maxWidth: '70px', marginBottom: '10px' }}
            />
            <span className="wallet-name">{wallet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
