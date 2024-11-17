import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { VscSnake } from "react-icons/vsc";
import { useEffect, useState } from "react";

type ApiResponse =
  | { status: 200; data: string; encoding: string }
  | { status: 403; message: string };

const fetchRevelation = async (randomNumber: number): Promise<ApiResponse> => {
  const endpoint = `https://fortuna.dourolabs.app/v1/chains/base/revelations/${randomNumber}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (response.status === 200) {
      const json = await response.json();
      return { status: 200, data: json.value.data, encoding: json.value.encoding };
    }

    if (response.status === 403) {
      const text = await response.text();
      return { status: 403, message: text };
    }

    throw new Error("Unexpected response");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const GradientCard = ({ data }: { data: string }) => {
  const color1 = `#${data.slice(0, 6)}`;
  const color2 = `#${data.slice(6, 12)}`;

  return (
    <Box
      w="100vw"
      h="90vh"
      bgGradient={`linear(to-br, ${color1}, ${color2})`}
      boxShadow="xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" color="white" fontWeight="bold">
        Reached Galaxy
        <Text fontSize="xs" fontWeight="thin">
            Powered by Pyth Entropy
          </Text>
      </Text>
    </Box>
  );
};

const RevelationPage = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchAndSetRevelation = async () => {
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
      const response = await fetchRevelation(randomNumber);
      setApiResponse(response);
    };

    fetchAndSetRevelation();
    const interval = setInterval(fetchAndSetRevelation, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      <Flex
        as="nav"
        w="full"
        h="10vh"
        bg="gray.800"
        color="white"
        align="center"
        px="4"
        justify="space-between"
      >
        <Flex align="center">
          <VscSnake size="36px" />
          <Text ml="2" fontSize="lg" fontWeight="bold">
            Pyth-in-galaxy
          </Text>
        </Flex>
      </Flex>

      <Center flex="1">
        <VStack spacing="4">
          {apiResponse?.status === 200 ? (
            <GradientCard data={apiResponse.data} />
          ) : (
            <VscSnake size="100px" color="gray.500" />
          )}
          {apiResponse?.status === 403 && (
             <Text fontSize="lg" color="purple.800">
             Galaxy Unreachable
             <Text fontSize="sm" color="purple.800">
              Random value cannot currently be retrieved.
            </Text>
           </Text>
        
          )}
        </VStack>
      </Center>
    </Flex>
  );
};

export default RevelationPage;
