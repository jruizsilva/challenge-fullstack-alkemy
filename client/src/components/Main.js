import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

import React from "react";
import { MyTable, ModalForm, BalanceCard } from "./index";

function Main() {
  return (
    <Box
      px={[4, 8, 16]}
      pt={8}
      h="85vh"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Flex direction="column" alignItems="center" rowGap={8}>
        <BalanceCard />
        <MyTable />
      </Flex>
    </Box>
  );
}

export default Main;
