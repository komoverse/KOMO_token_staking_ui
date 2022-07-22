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
        {id: 50, icon: <DragonIcon />, title: 'Token Staking', location: '/nftstaking'},
    ])

    useOnClickOutside(refMenu, () => setOpened(false))

    return (
        <header className='header'>
            <img src={logo} className="header__logo" alt='header__logo' />
            <button className='header-open-btn' onClick={() => setOpened(true)}>
                <div className="header-open-btn-line" />
                <div className="header-open-btn-line" />
                <div className="header-open-btn-line" />
            </button>
            <div className='header__tabs'>
                {tabs.map(tab => (
                    <div className={`header__tabs-item ${tab.location === location.pathname && 'active'}`} 
                         key={tab.id} onClick={() => navigate(tab.location)}>
                        {tab.icon}
                        {tab.title}
                    </div>
                ))}
                {/* <div className='header__tabs-line' style={{
                    width: `${100 / tabs.length}%`,
                    left: `${activeTab}%`
                }} /> */}
            </div>
            <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="header__connect-button">
            { 
                !publicKey ? <>Connect Wallet</> : publicKey.toBase58().slice(0, 4) + '..' + publicKey.toBase58().slice(-4)
            }
            </WalletMultiButton>
            <div className={`header-menu ${opened && 'open'}`} ref={refMenu}>
                <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className="header-menu__connect-button">
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
        </header>
    )
}
