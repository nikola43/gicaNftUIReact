import { useWeb3React } from "@web3-react/core";

import type1 from "../Materials/type1.png";
import type2 from "../Materials/type2.png";
import type3 from "../Materials/type3.png";

function App() {
	const { active, account, library, activate, deactivate, chainId } =
		useWeb3React();

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
						<button className="btn1">Mint Now</button>
					</div>
					<div className="box1">
						<img src={type2} style={{ width: "9rem" }} alt="" />
						<h3>Type#1</h3>
						<h3>
							Cap <span>500</span>
						</h3>
						<h3>
							Discount <span>100%</span>
						</h3>
						<button className="btn1">Mint Now</button>
					</div>
					<div className="box1">
						<img src={type1} style={{ width: "9rem" }} alt="" />
						<h3>Type#1</h3>
						<h3>
							Cap <span>500</span>
						</h3>
						<h3>
							Discount <span>100%</span>
						</h3>
						<button className="btn1">Mint Now</button>
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
						<button className="btn1"> Check 1st List</button>
						<button className="btn1"> Check 2nd List</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
