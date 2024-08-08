// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentraID {

    uint256 private tokenIdCounter;

    struct Identity {
        string firstName;
        string lastName;
        string username;
        string profilePictureUrl;
        bool privacyMode;
        address[] contacts;
        address[] requests;
        bool exists;
    }

    mapping(address => Identity) private identities;
    mapping(string => address) private usernames;

    event IdentityCreated(address indexed user, string username);
    event IdentityUpdated(address indexed user, string username, string profilePictureUrl, bool privacyMode);
    event ContactRequestSent(address indexed from, address indexed to);
    event ContactRequestAccepted(address indexed from, address indexed to);
    event ContactRequestDeclined(address indexed from, address indexed to);

    modifier onlyExistingUser(address userAddress) {
        require(identities[userAddress].exists, "Identity does not exist");
        _;
    }

    modifier onlyUniqueUsername(string memory username) {
        require(usernames[username] == address(0), "Username is already taken");
        _;
    }

    function registerIdentity(
        string memory _firstName,
        string memory _lastName,
        string memory _username,
        string memory _profilePictureUrl,
        bool _privacyMode
    ) external onlyUniqueUsername(_username) {
        require(!identities[msg.sender].exists, "Identity already registered");

        identities[msg.sender] = Identity({
            firstName: _firstName,
            lastName: _lastName,
            username: _username,
            profilePictureUrl: _profilePictureUrl,
            privacyMode: _privacyMode,
            contacts: new address[](0) ,
            requests: new address[](0) ,
            exists: true
        });

        usernames[_username] = msg.sender;

        emit IdentityCreated(msg.sender, _username);
    }

    function updateIdentity(
        string memory _firstName,
        string memory _lastName,
        string memory _profilePictureUrl,
        bool _privacyMode
    ) external onlyExistingUser(msg.sender) {
        Identity storage identity = identities[msg.sender];
        identity.firstName = _firstName;
        identity.lastName = _lastName;
        identity.profilePictureUrl = _profilePictureUrl;
        identity.privacyMode = _privacyMode;

        emit IdentityUpdated(msg.sender, identity.username, _profilePictureUrl, _privacyMode);
    }

    function sendContactRequest(address to) external onlyExistingUser(to) onlyExistingUser(msg.sender) {
        Identity storage recipient = identities[to];
        require(!isContact(to, msg.sender), "Already a contact");

        recipient.requests.push(msg.sender);
        emit ContactRequestSent(msg.sender, to);
    }

    function acceptContactRequest(address from) external onlyExistingUser(msg.sender) {
        Identity storage identity = identities[msg.sender];

        for (uint i = 0; i < identity.requests.length; i++) {
            if (identity.requests[i] == from) {
                identity.contacts.push(from);
                identities[from].contacts.push(msg.sender);

                // Remove the accepted request
                identity.requests[i] = identity.requests[identity.requests.length - 1];
                identity.requests.pop();

                emit ContactRequestAccepted(from, msg.sender);
                return;
            }
        }
        revert("Contact request not found");
    }

    function declineContactRequest(address from) external onlyExistingUser(msg.sender) {
        Identity storage identity = identities[msg.sender];

        for (uint i = 0; i < identity.requests.length; i++) {
            if (identity.requests[i] == from) {
                // Remove the declined request
                identity.requests[i] = identity.requests[identity.requests.length - 1];
                identity.requests.pop();

                emit ContactRequestDeclined(from, msg.sender);
                return;
            }
        }
        revert("Contact request not found");
    }

    function getIdentityByAddress(address userAddress) 
        external 
        view 
        onlyExistingUser(userAddress)
        returns (string memory firstName, string memory lastName, string memory username, string memory profilePictureUrl, bool privacyMode, address[] memory contacts)
    {
        Identity memory identity = identities[userAddress];

        if (identity.privacyMode && !isContact(userAddress, msg.sender)) {
            revert("Profile is private");
        }

        return (identity.firstName, identity.lastName, identity.username, identity.profilePictureUrl, identity.privacyMode, identity.contacts);
    }

    function getIdentityByUsername(string memory username) 
        external 
        view 
        returns (string memory firstName, string memory lastName, string memory profilePictureUrl, bool privacyMode, address userAddress, address[] memory contacts)
    {
        userAddress = usernames[username];
        require(userAddress != address(0), "Username does not exist");

        Identity memory identity = identities[userAddress];

        if (identity.privacyMode && !isContact(userAddress, msg.sender)) {
            revert("Profile is private");
        }

        return (identity.firstName, identity.lastName, identity.profilePictureUrl, identity.privacyMode, userAddress, identity.contacts);
    }

    function getContactRequests() external view onlyExistingUser(msg.sender) returns (address[] memory) {
        return identities[msg.sender].requests;
    }

    function isContact(address userAddress, address potentialContact) internal view returns (bool) {
        Identity memory identity = identities[userAddress];
        for (uint i = 0; i < identity.contacts.length; i++) {
            if (identity.contacts[i] == potentialContact) {
                return true;
            }
        }
        return false;
    }
}
