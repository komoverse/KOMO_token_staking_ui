import React, { useState, useEffect } from "react";
import idl from '../../json/idl.json';

import { PublicKey, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { Program, Provider, web3, BN } from '@project-serum/anchor';
import {
    useWallet,
    useConnection
} from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import config from "config/index.js"

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
require('@solana/wallet-adapter-react-ui/styles.css');

toast.configure();

const { SystemProgram, Keypair, SYSVAR_CLOCK_PUBKEY } = web3;
const programID = new PublicKey("Bez6azyFZ1hBYA8SiFpo9YfpMe2eU81NSwEPrQEGK5wZ");
const poolKeys = new PublicKey("DqsGLjc2mxmiiaYZpZNcnPPyP5NHyS5Zj92PVQrkz92K");

const opts = {
    preflightCommitment: "processed"
}

const token_decimal = 9;

const buttonsData = [
    {
        id: 0,
        durName: "7 days",
        durVal: 7,
        isActive: true
    },
    {
        id: 1,
        durName: "14 days",
        durVal: 14,
        isActive: false
    },
    {
        id: 2,
        durName: "30 days",
        durVal: 30,
        isActive: false
    },
    {
        id: 3,
        durName: "90 days",
        durVal: 90,
        isActive: false
    },
    {
        id: 4,
        durName: "180 days",
        durVal: 180,
        isActive: false
    },
    {
        id: 5,
        durName: "365 days",
        durVal: 365,
        isActive: false
    },
]

export const Body = () => {
    const [buttons, setButtons] = useState(buttonsData);
    const [balance, setBalance] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [xtagStakeAmount, setXtagStakeAmount] = useState(0);
    const [stakeType, setStakeType] = useState(7);
    const [xtagUnstakeAmount, setXtagUnstakeAmount] = useState(0);
    const [isUser, setIsUser] = useState(0);
    const [stakeTimeA, setStakeTimeA] = useState('');
    const [stakeTimeB, setStakeTimeB] = useState('');
    const [stakeTimeC, setStakeTimeC] = useState('');
    const [stakeTimeD, setStakeTimeD] = useState('');
    const [stakeTimeE, setStakeTimeE] = useState('');
    const [stakeTimeF, setStakeTimeF] = useState('');
    const [stakeDurationA, setStakeDurationA] = useState(7);
    const [stakeDurationB, setStakeDurationB] = useState(14);
    const [stakeDurationC, setStakeDurationC] = useState(30);
    const [stakeDurationD, setStakeDurationD] = useState(90);
    const [stakeDurationE, setStakeDurationE] = useState(180);
    const [stakeDurationF, setStakeDurationF] = useState(365);
    const [aLock, setALock] = useState(0);
    const [bLock, setBLock] = useState(0);
    const [cLock, setCLock] = useState(0);
    const [dLock, setDLock] = useState(0);
    const [eLock, setELock] = useState(0);
    const [fLock, setFLock] = useState(0);
    const [aPending, setAPending] = useState(0);
    const [bPending, setBPending] = useState(0);
    const [cPending, setCPending] = useState(0);
    const [dPending, setDPending] = useState(0);
    const [ePending, setEPending] = useState(0);
    const [fPending, setFPending] = useState(0);
    const [APY_A, setAPY_A] = useState(50);
    const [APY_B, setAPY_B] = useState(50);
    const [APY_C, setAPY_C] = useState(50);
    const [APY_D, setAPY_D] = useState(50);
    const [APY_E, setAPY_E] = useState(50);
    const [APY_F, setAPY_F] = useState(50);
    const [rewardAmountA, setRewardAmountA] = useState(0);
    const [rewardAmountB, setRewardAmountB] = useState(0);
    const [rewardAmountC, setRewardAmountC] = useState(0);
    const [rewardAmountD, setRewardAmountD] = useState(0);
    const [rewardAmountE, setRewardAmountE] = useState(0);
    const [rewardAmountF, setRewardAmountF] = useState(0);
    const [stakedAmountA, setStakedAmountA] = useState(0);
    const [stakedAmountB, setStakedAmountB] = useState(0);
    const [stakedAmountC, setStakedAmountC] = useState(0);
    const [stakedAmountD, setStakedAmountD] = useState(0);
    const [stakedAmountE, setStakedAmountE] = useState(0);
    const [stakedAmountF, setStakedAmountF] = useState(0);

    const wallet = useWallet();
    const { connection } = useConnection();


    const choiseDuration = (id) => {
        setButtons(buttons.map(button => {
            if (id === button.id) {
                    setStakeType(button.durVal);
                    return {
                    ...button,
                    isActive: true
                }
            }
            return {
                ...button,
                isActive: false
            }
        }))
    }

    async function createStakeAccount() {
        if (wallet.publicKey) {
            const provider = await getProvider();
            const program = new Program(idl, programID, provider);

            setLoading(true);
            console.log(program.programId.toBase58())
            try {
                console.log(poolKeys.toBase58())
                const [
                    _userPubkey, _userNonce,
                ] = await PublicKey.findProgramAddress(
                    [provider.wallet.publicKey.toBuffer(), poolKeys.toBuffer()],
                    program.programId
                );
                console.log(_userNonce)
                console.log(_userPubkey)
                console.log(poolKeys)
                try {
                    await program.rpc.createUser(_userNonce, {
                        accounts: {
                            pool: poolKeys,
                            user: _userPubkey,
                            owner: provider.wallet.publicKey,
                            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                            systemProgram: SystemProgram.programId,
                            tokenProgram: TOKEN_PROGRAM_ID,
                            rent: SYSVAR_RENT_PUBKEY
                        },
                    });
                    setLoading(false)
                    toast.success('You have successfully created account!', 'Success', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

                    await getTokenBalance(new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID));
                    await getStakedBalance();

                } catch (e) {
                    console.log(e, "mess")
                    if (e.message == 'failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit.') {
                        toast.info('You need to charge at least 0.00001 sol', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

                    }
                }
            }
            catch {
                toast.info('You have to connect your wallet', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

            }
        }
        else {
            toast.info('You have to connect your wallet', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

        }
    }

    async function stake() {
        let amount = parseFloat(xtagStakeAmount);
        if (amount < 1) {
            toast.info('Minimum Amount is 1 Token!', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }
        if (isNaN(amount) || amount === 0) {
            toast.info('Amount is zero.', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }

        const maxAmount = await getTokenBalance(new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID));
        if (amount > maxAmount) {
            toast.info('Not enough token amount.', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }
        const provider = await getProvider()

        const program = new Program(idl, programID, provider);
        let poolObject = await program.account.pool.fetch(poolKeys);
        const [
            _poolSigner,
            _nonce,
        ] = await PublicKey.findProgramAddress(
            [poolKeys.toBuffer()],
            programID
        );
       
        let poolSigner = _poolSigner;
        const [
            _userPubkey, _userNonce,
        ] = await PublicKey.findProgramAddress(
            [wallet.publicKey.toBuffer(), poolKeys.toBuffer()],
            programID
        );

        try {
            console.log(_userPubkey.toBase58())
            const data = await program.account.user.fetch(_userPubkey);
            console.log(data)
        } catch (e) {
            console.log(e)
            console.log(e.message)
            if (e.message == 'Account does not exist ' + _userPubkey.toBase58()) {
                await createStakeAccount();
            }
        }

        setLoading(true)
        try {

            const stakingMintObject = new Token(
                provider.connection,
                new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID),
                TOKEN_PROGRAM_ID,
                provider.wallet.payer);
            const stakingAccountInfo = await stakingMintObject.getOrCreateAssociatedAccountInfo(wallet.publicKey);
            const stakingPubkey = stakingAccountInfo.address;
            
            let tokenMintAPubkey = new PublicKey('29Z85f5mhZxppTuS5XC8j9jTKXmqMqhmuMenQG4qbSX8');
            console.log(stakeType);
            console.log(poolObject.stakingVault.toBase58())
            console.log(stakingPubkey.toBase58())
            await program.rpc.stake(
                new BN(amount * (10 ** 9)), new BN(stakeType),
                {
                    accounts: {
                        // Stake instance.
                        pool: poolKeys,
                        stakingVault: poolObject.stakingVault,
                        // User.
                        user: _userPubkey,
                        owner: wallet.publicKey,
                        stakeFromAccount: stakingPubkey,
                        // Program signers.
                        poolSigner,
                        systemProgram: SystemProgram.programId,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                        rent: SYSVAR_RENT_PUBKEY
                    },
                }
            );
            await getStakedBalance();
            // getEarned()
            setLoading(false)
            toast.success('Stake Success!', 'Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        } catch (err) {
            console.log(err)
            toast.error("Transaction Failure: ", err, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
            setLoading(false)
        }
    }

    async function unstake(stake_type) {
        let amount = 0;
        
        if (stake_type == 7){
            amount = stakedAmountA;
        }else if(stake_type == 14){
            amount = stakedAmountB;
        }else if(stake_type == 30){
            amount = stakedAmountC;
        }else if(stake_type == 90){
            amount = stakedAmountD;
        }else if(stake_type == 180){
            amount = stakedAmountE;
        }else if(stake_type == 365){
            amount = stakedAmountF;
        }
        console.log(amount);
        
        if (isNaN(amount) || parseFloat(amount) === 0) {
            toast.info('Amount is zero.', 'Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }

        const provider = await getProvider()

        const program = new Program(idl, programID, provider);
        let poolObject = await program.account.pool.fetch(poolKeys);
        const [
            _poolSigner,
            _nonce,
        ] = await PublicKey.findProgramAddress(
            [poolKeys.toBuffer()],
            programID
        );
        let poolSigner = _poolSigner;

        const [
            _userPubkey, _userNonce,
        ] = await PublicKey.findProgramAddress(
            [wallet.publicKey.toBuffer(), poolKeys.toBuffer()],
            programID
        );
        setLoading(true);
        try {

            const stakingMintObject = new Token(
                provider.connection,
                new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID),
                TOKEN_PROGRAM_ID,
                provider.wallet.payer);
            const stakingAccountInfo = await stakingMintObject.getOrCreateAssociatedAccountInfo(wallet.publicKey);
            const stakingPubkey = stakingAccountInfo.address;
            await program.rpc.unstake(
                new BN(stake_type),
                {
                    accounts: {
                        // Stake instance.
                        pool: poolKeys,
                        stakingVault: poolObject.stakingVault,
                        // User.
                        user: _userPubkey,
                        owner: wallet.publicKey,
                        stakeFromAccount: stakingPubkey,
                        // rewardFromAccount: rewardPubkey,
                        // Program signers.
                        poolSigner,
                        // Misc.
                        clock: SYSVAR_CLOCK_PUBKEY,
                        tokenProgram: TOKEN_PROGRAM_ID,
                    },
                });
            getStakedBalance();
            // getEarned();
            setLoading(false);
            toast.success('Unstake Success!', 'Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

        } catch (err) {
            console.log(err)
            setLoading(false);
            toast.error(`Transaction Failure : `, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })

        }
    }

    async function fund() {
        let amount = parseFloat(xtagStakeAmount);
        if (amount < 1) {
            toast.info('Minimum Amount is 1 Token!', 'Information', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
            return;
        }
       
        const provider = await getProvider()

        const program = new Program(idl, programID, provider);
        let poolObject = await program.account.pool.fetch(poolKeys);
        const [
            _poolSigner,
            _nonce,
        ] = await PublicKey.findProgramAddress(
            [poolKeys.toBuffer()],
            programID
        );
        let poolSigner = _poolSigner;
        const [
            _userPubkey, _userNonce,
        ] = await PublicKey.findProgramAddress(
            [wallet.publicKey.toBuffer(), poolKeys.toBuffer()],
            programID
        );

        try {
            const data = await program.account.user.fetch(_userPubkey);
        } catch (e) {
            console.log(e.message)
            if (e.message == 'Account does not exist ' + _userPubkey.toBase58()) {
                await createStakeAccount();
            }
        }

        setLoading(true)
        try {
            const stakingMintObject = new Token(
                provider.connection,
                new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID),
                TOKEN_PROGRAM_ID,
                provider.wallet.payer);
            const stakingAccountInfo = await stakingMintObject.getOrCreateAssociatedAccountInfo(wallet.publicKey);
            const stakingPubkey = stakingAccountInfo.address;
            await program.rpc.fund(
                new BN(amount * (10 ** 9)),
                {
                    accounts: {
                        // Stake instance.
                        pool: poolKeys,
                        stakingVault: poolObject.stakingVault,
                        funder: wallet.publicKey,
                        fromA: stakingPubkey,
                        // Program signers.
                        poolSigner,
                        tokenProgram: TOKEN_PROGRAM_ID,
                    }
                }
            );
            await getStakedBalance();
            // getEarned()
            setLoading(false)
            toast.success('Fund Success!', 'Infomation', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        } catch (err) {
            toast.error("Transaction Failure: ", err, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
            setLoading(false)
        }
    }


    async function getStakedBalance() {

        const provider = await getProvider()
        const program = new Program(idl, programID, provider);
        try {
            const [
                _userPubkey, _userNonce,
            ] = await PublicKey.findProgramAddress(
                [wallet.publicKey.toBuffer(), poolKeys.toBuffer()],
                programID
            );
            const accountData = await program.account.user.fetch(_userPubkey);

            if (accountData) {
                setIsUser(1);
            } else { return; }
            accountData.balanceStakedA > 0 ?
                setStakeTimeA(new Date(accountData.stakeTimeA * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeA('No Staked');

            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeA.toNumber())) > stakeDurationA) {
                let stakedAmount = (((accountData.balanceStakedA.toNumber() / (10 ** token_decimal)) * (APY_A / 100)) * 7 / (24 * 60 * 60)).toFixed(4);
                if (stakedAmount > 0.00001) {
                    setALock(1)

                }
                else {
                    setALock(0)
                }
                setAPending(0);
                setRewardAmountA(stakedAmount)
            }
            else {
                setAPending(1)
                setALock(0);
            }

            accountData.balanceStakedB > 0 ?
                setStakeTimeB(new Date(accountData.stakeTimeB * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeB('No Staked');
            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeB.toNumber())) > stakeDurationB) {
                let stakedAmount = (((accountData.balanceStakedB.toNumber() / (10 ** token_decimal)) * (APY_B / 100)) * 14 / (24 * 60 * 60)).toFixed(4);
                if (stakedAmount > 0.00001) {
                    setBLock(1)
                }
                else {
                    setBLock(0)
                }
                setBPending(0);
                setRewardAmountB(stakedAmount)
            }
            else {
                setBPending(1);
                setBLock(0);
            }

            accountData.balanceStakedC > 0 ?
                setStakeTimeC(new Date(accountData.stakeTimeC * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeC('No Staked');
            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeC.toNumber())) > stakeDurationC) {
                setCLock(0)
                let stakedAmount = (((accountData.balanceStakedC.toNumber() / (10 ** token_decimal)) * (APY_C / 100)) *30 / (24 * 60 * 60)).toFixed(4);
                if (stakedAmount > 0.00001) {
                    setCLock(1)
                }
                else {
                    setCLock(0)
                }
                setCPending(0)
                setRewardAmountC(stakedAmount)
            }
            else {
                setCPending(1)
                setCLock(0);
            }

            accountData.balanceStakedD > 0 ?
                setStakeTimeD(new Date(accountData.stakeTimeD * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeD('No Staked');
            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeD.toNumber())) > stakeDurationD) {
                setDLock(0)
                let stakedAmount = (((accountData.balanceStakedD.toNumber() / (10 ** token_decimal)) * (APY_D / 100)) * 90 / (24 * 60 * 60)).toFixed(4);
                if (stakedAmount > 0.00001) {
                    setDLock(1)
                }
                else {
                    setDLock(0)
                }
                setDPending(0)
                setRewardAmountD(stakedAmount)
            }
            else {
                setCPending(1)
                setCLock(0);
            }

            accountData.balanceStakedE > 0 ?
                setStakeTimeE(new Date(accountData.stakeTimeE * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeE('No Staked');
            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeE.toNumber())) > stakeDurationE) {
                setELock(0)
                let stakedAmount = (((accountData.balanceStakedE.toNumber() / (10 ** token_decimal)) * (APY_E / 100)) * 180 / (24 * 60 * 60)).toFixed(4)
                if (stakedAmount > 0.00001) {
                    setELock(1)
                }
                else {
                    setELock(0)
                }
                setEPending(0)
                setRewardAmountE(stakedAmount)
            }
            else {
                setEPending(1)
                setELock(0);
            }

            accountData.balanceStakedF > 0 ?
                setStakeTimeF(new Date(accountData.stakeTimeF * 1000).toISOString().slice(0, -5))
                :
                setStakeTimeF('No Staked');
            if ((((new Date().getTime()) / 1000) - (accountData.stakeTimeF.toNumber())) > stakeDurationF) {
                setFLock(0)
                let stakedAmount = (((accountData.balanceStakedF.toNumber() / (10 ** token_decimal)) * (APY_F / 100)) * 365 / (24 * 60 * 60)).toFixed(4);
                if (stakedAmount > 0.00001) {
                    setFLock(1)
                }
                else {
                    setFLock(0)
                }
                setFPending(0)
                setRewardAmountF(stakedAmount)
            }
            else {
                setFPending(1)
                setFLock(0);
            }

            console.log(accountData)

            setStakedAmountA((accountData.balanceStakedA.toNumber() / (10 ** token_decimal)).toFixed(2));
            setStakedAmountB((accountData.balanceStakedB.toNumber() / (10 ** token_decimal)).toFixed(2));
            setStakedAmountC((accountData.balanceStakedC.toNumber() / (10 ** token_decimal)).toFixed(2));
            setStakedAmountD((accountData.balanceStakedD.toNumber() / (10 ** token_decimal)).toFixed(2));
            setStakedAmountE((accountData.balanceStakedE.toNumber() / (10 ** token_decimal)).toFixed(2));
            setStakedAmountF((accountData.balanceStakedF.toNumber() / (10 ** token_decimal)).toFixed(2));
            // if (stakeType == stakeDurationA) {
            //     return (accountData.balanceStakedA.toNumber() / (10 ** token_decimal)).toFixed(4);
            // }
            // else if (stakeType == stakeDurationB) {
            //     return (accountData.balanceStakedB.toNumber() / (10 ** token_decimal)).toFixed(4);
            // }
            // else {
            //     return (accountData.balanceStakedC.toNumber() / (10 ** token_decimal)).toFixed(4);
            // }
        } catch (e) {
            setIsUser(0);
            console.log(e.message)
            return 0;
        }
    }

    async function getProvider() {
        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    async function getTokenBalance(pubkey) {
        if (!wallet.publicKey) {
            return 0;
        }
        const provider = await getProvider();
        const tokens = await provider.connection.getTokenAccountsByOwner(wallet.publicKey, { mint: pubkey });

        if (tokens.value.length == 0) {
            return 0;
        }
        const token = tokens.value.pop();
        const val = (await provider.connection.getTokenAccountBalance(token.pubkey)).value;
        const balance = val.uiAmount;

        return parseFloat(balance.toFixed(6));
    }

    useEffect(async () => {
        setBalance(await getTokenBalance(new PublicKey(config.REACT_APP_XTAG_STAKE_TOKEN_ID)));
        getStakedBalance();
    }, [wallet.publicKey])

    return (
        <div className="main">
            <div className="main__block">
                <p className="main__block-title">KOMO Token Staking</p>
                <div className="main__block-balance">
                    <p className="main__block-balance-sub">Balance</p>
                    <p className="main__block-balance-value">{balance ? balance.toFixed(2) : 0} KOMO</p>
                </div>
                <div className="main__block-stake-block">
                    <p className="main__block-stake-block--title">Stake Amount</p>
                    <div className="main__block-stake-block--input-gr">
                    <input className="main__block-stake-block--input" value={xtagStakeAmount} step="0.01" type="number" onChange={e => {
                                const amount = e.target.value;
                                if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                                  setXtagStakeAmount(amount)
                                }
                            }} /> KOMO
                    </div>
                </div>
                <div className="main__block-duration-block">
                    <p className="main__block-stake-block--title">Duration</p>
                    <div className="main__block-duration-block--buttons">
                        {
                            buttons.map(button => (
                                <button
                                    onClick={() => choiseDuration(button.id)}
                                    key={button.id}
                                    className={
                                        `main__block-duration-block--buttons-btn
                                         ${ button.isActive && 'active'}`
                                    }
                                >
                                    {button.durName}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="main__block-apy-block">
                    <p className="main__block-apy-block-title">APY</p>
                    <p className="main__block-apy-block-info">50% APY</p>
                </div>
                {isUser == 0 ?
                        <button className="main__block-stake-btn" onClick={() => createStakeAccount()}>
                            Create Account
                        </button>
                        : ''
                }
                <div className="main_create-account">
                </div>
                <button className="main__block-stake-btn" onClick={() => stake()}>
                    Stake Token
                </button> 
                <div className="main_create-account">
                </div>
                <button className="main__block-stake-btn" onClick={() => fund()}>
                    Fund Token
                </button>                 
            </div>
            <div className="main__block">
                <p className="main__block-title">Portfolio</p>
                <div className="main__block-portfolio-blocks">
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountA} KOMO / 7 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeA} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountA} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(7)}>
                            Get Reward
                        </button>
                    </div>
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountB} KOMO / 14 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeB} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountB} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(14)}>
                            Get Reward
                        </button>
                    </div>
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountC} KOMO / 30 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeC} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountC} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(30)}>
                            Get Reward
                        </button>
                    </div>
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountD} KOMO / 90 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeD} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountD} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(90)}>
                            Get Reward
                        </button>
                    </div>
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountE} KOMO / 180 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeE} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountE} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(180)}>
                            Get Reward
                        </button>
                    </div>
                    <div className="main__block-portfolio-block">
                        <div className="block-info main__block-portfolio-block--stake-info">
                            <p className="main__block-portfolio-block--stake-info-title">Stake Amount / Duration</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakedAmountF} KOMO / 365 days
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--remaining-info">
                            <p className="main__block-portfolio-block--stake-info-title">Staking Time</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                {stakeTimeF} 
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--apy-info">
                            <p className="main__block-portfolio-block--stake-info-title">APY</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                50%
                            </p>
                        </div>

                        <div className="block-info main__block-portfolio-block--reward-info">
                            <p className="main__block-portfolio-block--stake-info-title">Reward</p>
                            <p className="main__block-portfolio-block--stake-info-data">
                                +{rewardAmountF} KOMO
                            </p>
                        </div>

                        <button className="btn get-reward-btn" onClick={() => unstake(365)}>
                            Get Reward
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
