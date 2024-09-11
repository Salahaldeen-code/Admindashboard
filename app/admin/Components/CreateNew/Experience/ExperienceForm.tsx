"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Experiences } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createExperiencesSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type ExperiencesFormData = z.infer<typeof createExperiencesSchema>;

const ExperiencesForm = ({ experiences }: { experiences?: Experiences }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperiencesFormData>({
    resolver: zodResolver(createExperiencesSchema),
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
            formData.append("description", data.description);
            formData.append("date", data.date);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("logo", selectedFile);
            }

            // Send data to the API
            if (experiences)
              await axios.patch(`/api/experiences/${experiences.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/experiences", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/experience");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Name</FormLabel>
          <Input
            placeholder="Experience Title "
            defaultValue={experiences?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Date</FormLabel>
          <Input
            type="date"
            defaultValue={experiences?.title}
            {...register("date")}
          />
          <ErrorsMessage>{errors.date?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Input
            placeholder="Description "
            defaultValue={experiences?.description}
            fontSize="lg"
            {...register("description")}
          />
          <ErrorsMessage>{errors.description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Logo</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {experiences ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ExperiencesForm;
