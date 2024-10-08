import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, useAccount, useSwitchChain} from 'wagmi';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from './app/RequireLogin';
import Home from './pages/Home'

import {
  polygonAmoy,
  polygonMumbai,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Welcome from './pages/welcome';
import Signup from './pages/Signup';

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    polygonAmoy,
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome></Welcome>,
  },
  {
    path: "/",
    element: <RequireAuth></RequireAuth>,
    children: [
      {
      path:'/home',
      element:<Home></Home>,
      },
      {
        path: '/signup',
        element:<Signup></Signup>
      }
    ]
  }
])

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={polygonMumbai}>
        <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
