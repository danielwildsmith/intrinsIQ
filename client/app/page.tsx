"use client";

import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import Header from "@/components/nav-header";
import { Box, Flex, Text, CloseButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const BANNER_TIMEOUT = 1 * 60 * 1000; // 30 minutes in milliseconds

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has seen the banner before and if enough time has passed
    const lastSeen = localStorage.getItem("bannerLastSeen");
    const now = new Date().getTime();

    if (!lastSeen || now - parseInt(lastSeen) > BANNER_TIMEOUT) {
      setShowBanner(true);

      const wakeUpServer = async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
        } catch (error) {
          console.error("Error waking up server:", error);
        }
      };

      wakeUpServer();

      // Store the current timestamp in localStorage
      localStorage.setItem("bannerLastSeen", now.toString());

      // Hide the banner after 10 seconds
      setTimeout(() => setShowBanner(false), 10000);
    }
  }, []);

  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <PageWrapper>
      <main className="flex flex-col min-h-screen">
        <Header path="/" />

        {showBanner && (
          <Box
            bg="#33d778"
            p={4}
            color="black"
            position="absolute"
            top={0}
            width="100%"
            zIndex={1000}
          >
            <Flex justify="space-between" align="center">
              <Text>
                Pages may take a few seconds to load initially. To save on
                operational costs, the server needs to wake from a cold start.{" "}
              </Text>
              <CloseButton onClick={closeBanner} />
            </Flex>
          </Box>
        )}

        {/* This Flex grows to push the footer down */}
        <Flex flex="1" direction="column" justify="center" />

        <Footer />
      </main>
    </PageWrapper>
  );
}
