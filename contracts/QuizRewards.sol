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
    function issueReward(address _user, uint256 _amount) public {
        require(msg.sender == owner, "Only owner can issue rewards");
        rewards[_user] += _amount;
        emit RewardIssued(_user, _amount);
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
