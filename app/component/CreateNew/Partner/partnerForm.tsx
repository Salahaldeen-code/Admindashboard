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
import { Partners } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createPartnersSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type PartnersFormData = z.infer<typeof createPartnersSchema>;

const PartnersForm = ({ partners }: { partners?: Partners }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnersFormData>({
    resolver: zodResolver(createPartnersSchema),
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
            formData.append("name", data.name);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("logo", selectedFile);
            }

            // Send data to the API
            if (partners)
              await axios.patch(`/api/partners/${partners.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/partners", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/partners");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Partner Name "
            defaultValue={partners?.name}
            fontSize="lg"
            {...register("name")}
          />
          <ErrorsMessage>{errors.name?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Logo</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {partners ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PartnersForm;
