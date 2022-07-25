import React, { useRef, useState } from 'react';
import './styles.css';
import logo from '../../assets/g-komo.png';
import { CoinsIcon } from '../../assets/coins';
import { DragonIcon } from '../../assets/dragon';
import { useOnClickOutside } from '../..';
import { useLocation, useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export const Header = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [opened, setOpened] = useState(false);
    const refMenu = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { publicKey } = useWallet();

    const [tabs, _setTabs] = useState([
        {id: 0, icon: <CoinsIcon />, title: 'Token Staking', location: '/staking'},
        {id: 50, icon: <DragonIcon />, title: 'NFT Staking', location: '/nftstaking'},
    ])

    useOnClickOutside(refMenu, () => setOpened(false))

    return (
        <header className='navbar navbar-expand-lg navbar-dark bg-header p-0'>
            <div className="container-fluid">
                <img src={logo} alt='Komoverse Header Logo' />
                <button className="navbar-toggler" onClick={() => setOpened(true)} style={{border:1}}>
                <i className='fas fa-bars text-light'></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-3">
                        <a className="nav-link active" aria-current="page" href="#">
                            <i className="fas fa-coins"></i> &nbsp; Token Staking
                        </a>
                        </li>
                        <li className="nav-item px-3">
                        <a className="nav-link" href="#">
                            <i className="fas fa-dragon"></i> &nbsp; NFT Staking
                        </a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="btn btn-wallet">
                        { 
                            !publicKey ? <>Connect Wallet</> : publicKey.toBase58().slice(0, 4) + '..' + publicKey.toBase58().slice(-4)
                        }
                        </WalletMultiButton>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                <div className={`header-menu ${opened && 'open'}`} ref={refMenu}>
                    <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="btn btn-wallet">
                    { 
                        !publicKey ? <>Connect Wallet</> : publicKey.toBase58().slice(0, 4) + '..' + publicKey.toBase58().slice(-4)
                    }
                    </WalletMultiButton>
                    <div className="header-menu-list">
                            {tabs.map(tab => (
                                <p
                                key={tab.id}
                                onClick={() => navigate(tab.location)}
                                className={`header-menu-list-item ${tab.location === location.pathname && 'active'}`}>
                                    {tab.icon}
                                    {tab.title}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
        </header>


        // <header className='header'>
        //     <img src={logo} className="header__logo" alt='header__logo' />
        //     <button className='header-open-btn' onClick={() => setOpened(true)}>
        //         <div className="header-open-btn-line" />
        //         <div className="header-open-btn-line" />
        //         <div className="header-open-btn-line" />
        //     </button>
        //     <div className='header__tabs'>
        //         {tabs.map(tab => (
        //             <div className={`header__tabs-item ${tab.location === location.pathname && 'active'}`} 
        //                  key={tab.id} onClick={() => navigate(tab.location)}>
        //                 {tab.icon}
        //                 {tab.title}
        //             </div>
        //         ))}
        //         {/* <div className='header__tabs-line' style={{
        //             width: `${100 / tabs.length}%`,
        //             left: `${activeTab}%`
        //         }} /> */}
        //     </div>
        //     <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="header__connect-button">
        //     { 
        //         !publicKey ? <>Connect Wallet</> : publicKey.toBase58().slice(0, 4) + '..' + publicKey.toBase58().slice(-4)
        //     }
        //     </WalletMultiButton>
        //     <div className={`header-menu ${opened && 'open'}`} ref={refMenu}>
        //         <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="header-menu__connect-button">
        //         { 
        //             !publicKey ? <>Connect Wallet</> : publicKey.toBase58().slice(0, 4) + '..' + publicKey.toBase58().slice(-4)
        //         }
        //         </WalletMultiButton>
        //         <div className="header-menu-list">
        //                 {tabs.map(tab => (
        //                     <p
        //                       key={tab.id}
        //                       onClick={() => navigate(tab.location)}
        //                       className={`header-menu-list-item ${tab.location === location.pathname && 'active'}`}>
        //                         {tab.icon}
        //                         {tab.title}
        //                     </p>
        //                 ))}
        //         </div>
        //     </div>
        // </header>
    )
}
