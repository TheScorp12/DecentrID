import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212]">
      <h1 className="text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'ClashGrotesk' }}>
        Welcome
      </h1>
      <div>
        <ConnectButton.Custom>
          {({ account, openAccountModal, openConnectModal, openChainModal, mounted }) => {
            // Render nothing if the button is not mounted
            if (!mounted) {
              return null;
            }

            if (!account) {
              return (
                <button
                  onClick={openConnectModal}
                  className="bg-[#6b65c2] text-white py-3 px-6 rounded-lg text-lg hover:bg-[#6b65c2] transition-colors"
                >
                  Connect Wallet
                </button>
              );
            } else {
              return (
                <button
                  onClick={openAccountModal}
                  className="bg-[#6b65c2] text-white py-3 px-6 rounded-lg text-lg hover:bg-[#5953a1] transition-colors"
                >
                  Wallet Connected
                </button>
              );
            }
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Welcome;
