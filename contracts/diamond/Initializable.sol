// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract Initializable {
    bool internal _initialized;
    bool internal _initializing;

    modifier initializer() {
        require(!_initialized, "Already initialized");
        _initialized = true;
        _;
    }
}
