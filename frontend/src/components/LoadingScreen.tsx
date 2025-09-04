"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LoadingScreenProps } from "./types";

export function LoadingScreen({ fullpageApi }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const animateStages = async () => {
      // Stage 1: Show only icon
      setStage(1);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Stage 2: Show Israel
      setStage(2);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Stage 3: Show <dev>
      setStage(3);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Move to next section using fullpage API
      if (fullpageApi) {
        fullpageApi.moveSectionDown();
      }
    };

    animateStages();
  }, [fullpageApi]);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10"
    >
      {/* Main Content - Horizontal Layout */}
      <div className="flex items-center gap-4">
        {/* Dev Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 219 219" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <mask id="mask0_21_7" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="219" height="219">
              <path d="M100.74 4.37988C69.0893 4.37988 45.7516 15.2905 30.66 32.4136C15.5684 49.5367 8.76001 72.5306 8.76001 96.3599C8.76001 115.66 14.7391 133.617 24.8599 148.338C34.0352 161.684 39.42 177.484 39.42 193.592V214.62H48.18V193.592C48.18 175.537 42.1768 158.063 32.0801 143.376C22.929 130.066 17.52 113.852 17.52 96.3599C17.52 74.1992 23.8516 53.3931 37.23 38.2137C50.6084 23.0343 71.0707 13.1399 100.74 13.1399C130.534 13.1399 149.827 21.8078 162.573 35.0656C175.319 48.3233 181.656 66.5949 183.994 86.3595L184.097 87.2663L205.099 123.453C206.188 125.414 205.642 127.363 203.738 128.431L183.96 138.329V164.686C183.96 181.076 170.477 193.82 154.147 192.301L154.078 192.292L135.78 191.112V214.62H144.54V200.453L153.334 201.027C174.672 203.011 192.72 185.965 192.72 164.686V143.744L207.905 136.148L207.99 136.105C213.955 132.791 216.042 125.118 212.755 119.201L212.738 119.167L192.378 84.0839C189.773 63.5762 183.107 43.7836 168.887 28.9917C154.367 13.889 132.266 4.37988 100.74 4.37988ZM109.491 61.26C108.481 61.2643 107.504 61.6175 106.725 62.2598C105.945 62.9021 105.411 63.794 105.214 64.7845L92.0741 126.105C91.9537 126.667 91.9454 127.249 92.0497 127.815C92.1539 128.381 92.3687 128.921 92.6816 129.404C92.9946 129.887 93.3997 130.304 93.8737 130.63C94.3478 130.957 94.8815 131.187 95.4444 131.307C96.0074 131.427 96.5884 131.435 97.1545 131.331C97.7206 131.227 98.2606 131.012 98.7436 130.699C99.2266 130.385 99.6432 129.98 99.9696 129.506C100.296 129.032 100.526 128.498 100.646 127.935L113.786 66.6152C113.933 65.9717 113.932 65.3033 113.785 64.6599C113.637 64.0166 113.346 63.4149 112.933 62.8999C112.52 62.385 111.996 61.97 111.4 61.686C110.804 61.402 110.152 61.2564 109.491 61.26ZM72.4326 74.4086C71.7201 74.3882 71.0135 74.5419 70.374 74.8565C69.7344 75.171 69.1813 75.6369 68.7626 76.2136L53.655 96.3599L68.7626 116.506C69.4591 117.436 70.4967 118.052 71.647 118.217C72.7972 118.382 73.9661 118.084 74.8963 117.387C75.8265 116.691 76.442 115.653 76.6072 114.503C76.7724 113.353 76.474 112.184 75.7774 111.254L64.605 96.3599L75.7774 81.4662C76.2719 80.8264 76.5797 80.0622 76.6666 79.2583C76.7536 78.4543 76.6163 77.642 76.27 76.9113C75.9237 76.1806 75.3818 75.56 74.7045 75.1183C74.0272 74.6765 73.2409 74.4309 72.4326 74.4086ZM133.299 74.4171C132.503 74.4629 131.735 74.725 131.077 75.1752C130.419 75.6254 129.897 76.2466 129.566 76.9719C129.235 77.6971 129.108 78.4989 129.199 79.2909C129.29 80.0829 129.596 80.835 130.083 81.4662L141.255 96.3599L130.083 111.254C129.386 112.184 129.088 113.353 129.253 114.503C129.418 115.653 130.034 116.691 130.964 117.387C131.894 118.084 133.063 118.382 134.213 118.217C135.363 118.052 136.401 117.436 137.097 116.506L152.205 96.3599L137.097 76.2136C136.666 75.6198 136.091 75.1441 135.428 74.8302C134.764 74.5163 134.032 74.3743 133.299 74.4171Z" fill="black"/>
            </mask>
            <g mask="url(#mask0_21_7)">
              <rect x="-93" y="102.38" width="521.819" height="260.815" transform="rotate(-43.8315 -93 102.38)" fill="#667678"/>
              <rect x="-93" y="102.38" width="521.819" height="260.815" transform="rotate(-43.8315 -93 102.38)" fill="url(#paint0_radial_21_7)"/>
              <rect x="-93" y="102.38" width="521.819" height="260.815" transform="rotate(-43.8315 -93 102.38)" fill="url(#paint1_linear_21_7)"/>
            </g>
            <defs>
              <radialGradient id="paint0_radial_21_7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(167.909 232.788) rotate(90) scale(130.407 10.5733)">
                <stop stopColor="#13E7AB"/>
                <stop offset="1" stopColor="#23A8BF" stopOpacity="0.58"/>
              </radialGradient>
              <linearGradient id="paint1_linear_21_7" x1="167.909" y1="102.38" x2="167.909" y2="363.195" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="0.6" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text Animation - Horizontal to Icon */}
        <div className="flex items-center gap-1 text-2xl font-mono">
          {/* Stage 2: Show Israel */}
          {stage >= 2 && (
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[#13E7AB] font-semibold"
            >
              Israel
            </motion.span>
          )}

          {/* Stage 3: Show <dev> */}
          {stage >= 3 && (
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-[#23A8BF] ml-2"
            >
              &lt;dev&gt;
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}
