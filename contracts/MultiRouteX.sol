// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MultiRouteX
 * @dev Simple storage contract untuk demo purposes
 * @author MultiRouteX Team
 */
contract MultiRouteX {
    uint256 public storedValue;
    address public owner;
    
    event ValueChanged(uint256 oldValue, uint256 newValue);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        storedValue = 0;
    }
    
    /**
     * @dev Set nilai baru ke storedValue
     * @param _newValue Nilai yang akan disimpan
     */
    function setValue(uint256 _newValue) external onlyOwner {
        emit ValueChanged(storedValue, _newValue);
        storedValue = _newValue;
    }
    
    /**
     * @dev Mendapatkan nilai storedValue
     * @return currentValue Nilai yang tersimpan
     */
    function getValue() external view returns (uint256 currentValue) {
        return storedValue;
    }
    
    /**
     * @dev Transfer ownership contract
     * @param _newOwner Alamat owner baru
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}