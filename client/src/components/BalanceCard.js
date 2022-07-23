import React from "react";
import {
  Box,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalForm } from "./index";

function BalanceCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="white"
        w={["240px"]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="5"
      >
        <Stat mb={4}>
          <StatLabel fontSize={"lg"} color="blue.500">
            Balance
          </StatLabel>
          <StatNumber fontSize={"3xl"}>$0.00</StatNumber>
          <StatHelpText>
            {new Date().toLocaleString("es-AR", { dateStyle: "short" })}
          </StatHelpText>
        </Stat>
        <Link color="blue.400" href="#" onClick={onOpen}>
          Actualizar
        </Link>
      </Box>
      <ModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default BalanceCard;
