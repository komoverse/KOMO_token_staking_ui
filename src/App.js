import './App.css';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Footer } from './components/Footer/Footer';
import { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const { publicKey } = useWallet();
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
          options: { clientId: 'Get a client ID @ https://developer.tor.us' }
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
  ], [network]);


  return (
        <ConnectionProvider endpoint={endpoint} id="connectButton">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <Router>
                        <Header />
                        <Routes>
                          <Route path='/nftstaking' element={<Body />} />
                          <Route path='/staking' element={<Body />} />
                          <Route path="/" element={<Navigate replace to="/staking" />} />
                        </Routes> 
                        <Footer />
                    </Router>
                </WalletModalProvider >
            </WalletProvider>
        </ConnectionProvider>
  );
}

export default App;
