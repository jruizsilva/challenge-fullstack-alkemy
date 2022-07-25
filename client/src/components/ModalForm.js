import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { login } from "../redux/reducers/user";

function ModalForm({ isOpen, onClose }) {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      type: "",
      date: "",
    },
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
        userId: user.id,
      };
      const res = await axios.post("/api/transactions", body);
      toast({
        title: res.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      axios
        .get("/api/users/token", {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => {
          dispatch(login({ user: res.data }));
        })
        .catch((err) => {
          console.log(err);
        });
      reset();
    } catch (error) {
      if (error.response.data.errors) {
        console.log(error.response.data.errors);
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Agregar registro</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody pb={6}>
          <FormControl isInvalid={errors.name}>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre"
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                pattern: {
                  value: /^[a-z A-Z]+$/,
                  message:
                    "El nombre solo puede tener letras y no contener espacios al inicio o al final.",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 255,
                  message: "Debe tener menos de 255 caracteres",
                },
              })}
            />
            {!errors.name && (
              <FormHelperText>
                El nombre solo puede tener letras.
              </FormHelperText>
            )}
            {errors.name && (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={errors.ammout}>
            <FormLabel>Cantidad</FormLabel>
            <Input
              type="number"
              min={1}
              placeholder="Cantidad"
              {...register("amount", {
                required: {
                  value: true,
                  message: "La cantidad es requerida",
                },
                pattern: {
                  value: /^[0-9]+/,
                  message: "Debe ser un valor númerico mayor a 0",
                },
              })}
            />
            {!errors.value && (
              <FormHelperText>
                La cantidad debe ser un valor númerico mayor a 0.
              </FormHelperText>
            )}

            {errors.value && (
              <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={errors.type}>
            <FormLabel>Tipo</FormLabel>
            <Select
              placeholder="Tipo"
              {...register("type", {
                required: {
                  value: true,
                  message: "El tipo es requerido",
                },
              })}
            >
              <option value="egress">Egreso</option>
              <option value="ingress">Ingreso</option>
            </Select>
            {errors.type && (
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={errors.date}>
            <FormLabel>Fecha</FormLabel>
            <Input
              type="date"
              placeholder="Fecha"
              {...register("date", {
                required: {
                  value: true,
                  message: "La fecha es requerida",
                },
              })}
            />
            {errors.date && (
              <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;
