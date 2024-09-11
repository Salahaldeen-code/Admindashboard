"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { GeneralInfo } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { creategeneralInfoSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type ServicesFormData = z.infer<typeof creategeneralInfoSchema>;

const GeneralInfoForm = ({ generalInfo }: { generalInfo?: GeneralInfo }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesFormData>({
    resolver: zodResolver(creategeneralInfoSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <Box
      border="3px solid"
      borderColor="black.300"
      padding={0}
      borderRadius="md"
      marginTop={10}
      marginLeft={10}
      marginRight={10}
    >
      {error && <Text>{error}</Text>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const formData = new FormData(); // Create FormData object

            // Append text fields to FormData
            formData.append("title", data.title);
            // Append text fields to FormData
            formData.append("key", data.key);
            // Append text fields to FormData
            formData.append("value", data.value);

            // Send data to the API
            if (generalInfo)
              await axios.patch(
                `/api/generalInfo/${generalInfo.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            else
              await axios.post("/api/generalInfo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/generalInfo");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="generalInfo Title "
            defaultValue={generalInfo?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">Small Description</FormLabel>
          <Input
            placeholder="generalInfo Title "
            defaultValue={generalInfo?.key}
            fontSize="lg"
            {...register("key")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>
          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="generalInfo Title "
            defaultValue={generalInfo?.value}
            fontSize="lg"
            {...register("value")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <Button type="submit" colorScheme="teal">
            {generalInfo ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default GeneralInfoForm;
