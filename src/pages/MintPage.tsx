import { useWeb3React } from "@web3-react/core";

import type1 from "../Materials/type1.png";
import type2 from "../Materials/type2.png";
import type3 from "../Materials/type3.png";

// import abi file
import KittieNftAbi from "../blockchain/abi/KittieNft.json";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function App() {
	const { active, account, library, activate, deactivate, chainId } =
		useWeb3React();

	const [isMintingOneLoading, setIsMintingOneLoading] = useState(false);
	const [isMintingTwoLoading, setIsMintingTwoLoading] = useState(false);
	const [isMintingThreeLoading, setIsMintingThreeLoading] = useState(false);

	const [merkleProofL1, setMerkleProofL1] = useState([]);
	const [merkleProofL2, setMerkleProofL2] = useState([]);

	let kittieNftContract: any;

	const kittieNftAddress = "0x8F171cA032227dFE08c2793c837cB999B8C276e1";

	if (library) {
		kittieNftContract = new library.eth.Contract(
			KittieNftAbi,
			kittieNftAddress
		);
	}

	useEffect(() => {
		if (account) {
			getProof(account, "1").then((proof) => {
				setMerkleProofL1(proof);
			});
			getProof(account, "2").then((proof) => {
				setMerkleProofL2(proof);
			});
		}
	}, [account]);

	// function for all api
	// api url https://merkle-tree-nft-api.vercel.app/
	function getProof(address: string, listNumber: string) {
		const proof = fetch(
			"https://merkle-tree-nft-api.vercel.app" +
				"/get_proof_by_address/" +
				listNumber +
				"/" +
				address
		)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		return proof;
	}

	// function for all api
	// api url https://merkle-tree-nft-api.vercel.app/
	function getProof2(address: string, listNumber: string) {
		fetch(
			"https://merkle-tree-nft-api.vercel.app" +
				"/get_proof_by_address/" +
				listNumber +
				"/" +
				address
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.length === 0) {
					toast.error("You are not on the list " + listNumber + ".");
				} else {
					toast.success("You are on the list " + listNumber + ".");
				}
			});
	}

	// function for minting
	async function mintNFT() {
		const mintAmount = 1;

		setIsMintingOneLoading(true);

		console.log(merkleProofL1);
		console.log(merkleProofL2);

		const mintingCost = await kittieNftContract.methods
			.calculateMintingCost(mintAmount, merkleProofL1, merkleProofL2)
			.call();
		console.log(mintingCost);

		await kittieNftContract.methods
			.mint(mintAmount, merkleProofL1, merkleProofL2)
			.send({ from: account, value: mintingCost })
			.then(
				(res: any) => {
					console.log(res);
					toast.success("Minted Successfully");
					setIsMintingOneLoading(false);
				},
				(err: any) => {
					console.log(err);
					toast.error(err.message);
					setIsMintingOneLoading(false);
				}
			);

		console.log(mintingCost);
	}

	return (
		<div className="container-background">
			<div className="contant_section">
				<div>
					<h1>Minting Page</h1>
					<p>
						ClaimKitty has now released its NFTs Collection! <br />{" "}
						Buy your NFTs and get benefits such as discounts on new
						AirDrop creation and distribution of royalties <br />{" "}
						among holders. There are four types of NFTs: each one
						has different traits, rarity and discounts for <br />{" "}
						AirDrop Fee Creation.
					</p>
				</div>
			</div>

			<section>
				<div className="box_section">
					<div className="box1">
						<img src={type3} style={{ width: "9rem" }} alt="" />
						<h3>Type#1</h3>
						<h3>
							Cap <span>500</span>
						</h3>
						<h3>
							Discount <span>100%</span>
						</h3>
						<button className="btn1" onClick={mintNFT}>
							Mint Now
							{isMintingOneLoading ? (
								<div className="loader"></div>
							) : null}
						</button>
					</div>
					<div className="box1">
						<img src={type2} style={{ width: "9rem" }} alt="" />
						<h3>Type#2</h3>
						<h3>
							Cap <span>500</span>
						</h3>
						<h3>
							Discount <span>100%</span>
						</h3>
						<button className="btn1" onClick={mintNFT}>
							Mint Now
							{isMintingTwoLoading ? (
								<div className="loader"></div>
							) : null}
						</button>
					</div>
					<div className="box1">
						<img src={type1} style={{ width: "9rem" }} alt="" />
						<h3>Type#3</h3>
						<h3>
							Cap <span>500</span>
						</h3>
						<h3>
							Discount <span>100%</span>
						</h3>
						<button className="btn1" onClick={mintNFT}>
							Mint Now
							{isMintingThreeLoading ? (
								<div className="loader"></div>
							) : null}
						</button>
					</div>
				</div>
			</section>

			<div className="freemint">
				<div className="freemint-contant">
					<h1>Check if you are elegible for Free-Mint NFT.</h1>
					<p>
						ClaimKitty team has worked on two lists of addresses
						elegible for free-mint NFTs: the first one goes from{" "}
						<br /> 15/02/2023 to 15/08/2023, the second one from
						15/08/2023 to 15/02/2024. Click on the buttons below to
						show the two lists.
					</p>
					<div className="twobtn">
						<button
							className="btn1"
							onClick={async () => {
								if (account) {
									await getProof2(account, "1");
								} else {
									toast("Please connect your wallet");
								}
							}}
						>
							{" "}
							Check 1st List
						</button>
						<button
							className="btn1"
							onClick={async () => {
								if (account) {
									await getProof2(account, "2");
								} else {
									toast("Please connect your wallet");
								}
							}}
						>
							{" "}
							Check 2nd List
						</button>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
