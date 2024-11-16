import { Flex, Heading } from "@chakra-ui/react";
import { VscSnake } from "react-icons/vsc";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <VscSnake size="40px" color="black" />
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "with-pyth-entropy",
};
