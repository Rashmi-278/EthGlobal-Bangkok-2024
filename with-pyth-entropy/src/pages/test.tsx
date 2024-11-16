import { Box, Center, Text } from "@chakra-ui/react";
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

const GradientDisplay = ({ data }: { data: string }) => {
  // Use a slice of the `data` value to generate two colors
  const color1 = `#${data.slice(0, 6)}`;
  const color2 = `#${data.slice(6, 12)}`;

  return (
    <Box
      w="full"
      h="full"
      bgGradient={`linear(to-br, ${color1}, ${color2})`}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" color="white" fontWeight="bold">
        Generated Gradient
      </Text>
    </Box>
  );
};

const RevelationPage = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const randomNumber = Math.floor(Math.random() * 100); // Replace with your logic

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchRevelation(randomNumber);
        setApiResponse(response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, [randomNumber]);

  return (
    <Center h="100vh" w="100vw">
      {apiResponse ? (
        apiResponse.status === 200 ? (
          <GradientDisplay data={apiResponse.data} />
        ) : (
          <Box textAlign="center">
            <VscSnake size="100px" color="gray" />
            <Text fontSize="lg" mt={4}>
              {apiResponse.message || "Cannot retrieve value"}
            </Text>
          </Box>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </Center>
  );
};

export default RevelationPage;
