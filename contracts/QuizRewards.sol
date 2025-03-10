// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract QuizRewards {
    address public owner;
    mapping(address => uint256) public rewards;

    event RewardIssued(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Function to issue rewards based on quiz marks
      function calculateReward(uint256 score) internal pure returns (uint256) {
        if (score > 2) {
            // For example, every point above 2 gives 100 units reward.
            return (score - 2) * 100;
        }
        return 0;
    }
    function issueReward(address _user, uint256 _score) public {
        require(msg.sender == owner, "Only owner can issue rewards");
         uint256 rewardAmount = calculateReward(score);
        require(rewardAmount > 0, "Score too low for reward");
        rewards[_user] += rewardAmount;
        emit RewardIssued(_user, rewardAmount);
    }

    // Optionally, add functions for users to claim or check rewards
    function claimReward() public {
        uint256 amount = rewards[msg.sender];
        require(amount > 0, "No reward available");
        rewards[msg.sender] = 0;
        // In a real token contract, you would transfer tokens here.
        payable(msg.sender).transfer(amount);
    }

    // Allow contract to receive ETH (if rewards are in native currency)
    receive() external payable {}
}
