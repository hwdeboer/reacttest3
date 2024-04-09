//App.js file

import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import ABIWDRIP from "./WDRIPONLYUP_ABI.json";

function App() {
  // State variables for wallet connection status and address
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const wdripOnlyUPAddress = "0xcC95f46652597e57a3F8A8836aE092d339264fD0";
  const wdripAddress = "0xF30224eB7104aca47235beb3362E331Ece70616A";

  // Function to connect/disconnect the wallet
  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
    }
  }

  async function approve() {
    if (connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);

      const wdripOnlyUPContract = new ethers.Contract(
        wdripOnlyUPAddress,
        ABIWDRIP,
        signer
      );

      let result = await wdripOnlyUPContract.approve(wdripOnlyUPAddress, 10, {
        from: _walletAddress,
      });
      result = await result.wait();
      console.log(result);
    }
  }

  // Function to connect/disconnect the wallet
  async function mint() {
    if (connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);

      const wdripOnlyUPContract = new ethers.Contract(
        wdripOnlyUPAddress,
        ABIWDRIP,
        signer
      );

      let mintAmount = await wdripOnlyUPContract.mintWithBacking(
        10,
        _walletAddress,
        {
          from: _walletAddress,
        }
      );
      let result = await result.wait();
    }
  }

  // Function to connect/disconnect the wallet
  async function redeem() {
    if (connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      //setConnected(true);
      //setWalletAddress(_walletAddress);

      const wdripOnlyUPContract = new ethers.Contract(
        wdripOnlyUPAddress,
        ABIWDRIP,
        signer
      );

      let redeemAmount = await wdripOnlyUPContract.sell(10, {
        from: _walletAddress,
      });

      let result = await result.wait();
    }
  }

  return (
    <div className="app">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <button className="btn" onClick={approve}>
            {connected ? "Approve token" : "Approve token"}
          </button>
          <button className="btn" onClick={mint}>
            {connected ? "Mint token" : "Mint token"}
          </button>
          <button className="btn" onClick={redeem}>
            {connected ? "Redeem token" : "Redeem token"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
