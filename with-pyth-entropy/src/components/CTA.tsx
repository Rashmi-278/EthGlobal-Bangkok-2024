import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    
    <Button
      as={ChakraLink}
      isExternal
      href="https://github.com/Rashmi-278/EthGlobal-Bangkok-2024"
      variant="outline"
      colorScheme="purple"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      View Repo
    </Button>
    <Button
      as={ChakraLink}
      href="/pyth"
      variant="solid"
      colorScheme="purple"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >
      Travel with Pyth
    </Button>
  </Container>
);
