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
import { Services } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createServicesSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type ServicesFormData = z.infer<typeof createServicesSchema>;

const ServicesForm = ({ services }: { services?: Services }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicesFormData>({
    resolver: zodResolver(createServicesSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File state

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

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
            formData.append("descriptionL", data.descriptionL);
            formData.append("descriptionM", data.descriptionM);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
              formData.append("icon", selectedFile);
            }

            // Send data to the API
            if (services)
              await axios.patch(`/api/services/${services.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/services", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/services");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="services Title "
            defaultValue={services?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Short Description</FormLabel>
          <Input
            placeholder="services descriptionM "
            defaultValue={services?.descriptionM}
            fontSize="lg"
            {...register("descriptionM")}
          />
          <ErrorsMessage>{errors.descriptionM?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Long Description</FormLabel>

          <Input
            placeholder="services descriptionL "
            defaultValue={services?.descriptionL}
            fontSize="lg"
            {...register("descriptionL")}
          />
          <ErrorsMessage>{errors.descriptionL?.message}</ErrorsMessage>

          {/* File input for icon */}
          <FormLabel fontSize="25px">Icon</FormLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {/* File input for image */}
          <FormLabel fontSize="25px">Image</FormLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {services ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ServicesForm;
