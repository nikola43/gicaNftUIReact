import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { injected } from "../blockchain/metamaskConnector";
import discord from "../Materials/discord.svg";
import forum from "../Materials/forum.png";
import twitter from "../Materials/twitter.svg";


function NavBar() {
	const { active, account, library, activate, deactivate, chainId } =
		useWeb3React();

	const NodeManagerAddress = "0xF193c3090aF70BC86c0c38BEBf349fA39762F6dE";
	const PonziXAddress = "0x629C4607C42A018E11416BB6f7B6adD3B4F03384";

	useEffect(() => {
		if (account) {
			/*
			nodeRewardsContract = new library.eth.Contract(
				NodeManagerAbi,
				NodeManagerAddress
			).methods;

			tokenContract = new library.eth.Contract(PonziXAbi, PonziXAddress)
				.methods;
				*/
		}
	}, [account]);

	useEffect(() => {
		const isWalletConnected = localStorage.getItem("isWalletConnected");
		const connector = localStorage.getItem("connector");
		if (isWalletConnected === "true" && connector === "injected") {
			activate(injected);
		}
	}, [active]);

	async function connectMetamaks() {
		try {
			await activate(injected, undefined, true);
			localStorage.setItem("connector", "injected");
			localStorage.setItem("isWalletConnected", "true");
		} catch (ex) {
			console.log(ex);
		}
	}

	function getWalletAbreviation(
		walletAddress: string | null | undefined
	): string {
		if (walletAddress !== null && walletAddress !== undefined) {
			return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
		}
		return "";
	}

	async function disconnect() {
		try {
			deactivate();
			localStorage.setItem("isWalletConnected", "false");
			localStorage.removeItem("connector");
		} catch (ex) {
			console.log(ex);
		}
	}

	return (
		<div className="header">
			<div className="left_header">
				<img src={twitter} alt="Twitter" />
				<img src={discord} alt="Discord" />
				<img src={forum} alt="Forum" />
			</div>
			<div className="middle_header">
				<h1>Kitties.Vip</h1> <br /> <span>by claimkitty</span>
			</div>
			<div className="right_header">
				<button className="btn">Contact Wallet</button>
			</div>
		</div>
	);
}

export default NavBar;
