import { useWeb3React } from "@web3-react/core";
import KittieNftAbi from "../blockchain/abi/KittieNft.json";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import kittieNftAddress from "../blockchain/addresses";

function ClaimPage() {
	const { active, account, library, activate, deactivate, chainId } =
		useWeb3React();

	const [isClaimLoading, setIsClaimLoading] = useState(false);

	let kittieNftContract: any;


	if (library) {
		kittieNftContract = new library.eth.Contract(
			KittieNftAbi,
			kittieNftAddress
		);
	}

	const claimRewards = async () => {
		setIsClaimLoading(true);
		await kittieNftContract.methods
			.claimRewards()
			.send({ from: account })
			.then(
				(res: any) => {
					console.log(res);
					toast.success("Claimed Successfully");
					setIsClaimLoading(false);
				},
				(err: any) => {
					console.log(err);
					toast.error(err.message);
					setIsClaimLoading(false);
				}
			);
	};

	return (
		<div className="container-background">
			<div className="claim_reward">
				<div>
					<h1>Claim NFT Holding rewards</h1>
					<div className="claim_box">
						<p>
							The royalties derived from NFTs sales on the
							marketplaces will be equally distributed among
							holders. All you need to do is buy <br /> and hold
							your Bast.Club NFT and claim your passive incomes on
							this page. Just see the amounts of Eth to claim here
							and execute the transaction.
						</p>{" "}
						<br />
						<p>Amount of ETH to claim: 2.0 ETH</p>
						<div className="btn_design">
							<button
								className="claim_btn"
								onClick={claimRewards}
							>
								Claim your Reward
								{isClaimLoading ? (
									<div className="loader"></div>
								) : null}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClaimPage;
