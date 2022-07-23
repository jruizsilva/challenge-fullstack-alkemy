import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} w={["100%", "md", "lg"]} py={[6, 12]} px={[3, 6]}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Iniciar sesión</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          w="100%"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}></Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Iniciar sesión
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              ¿Aun no tienes una cuenta?{" "}
              <Link as={NavLink} to="/register" color={"blue.400"}>
                Registrate
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
