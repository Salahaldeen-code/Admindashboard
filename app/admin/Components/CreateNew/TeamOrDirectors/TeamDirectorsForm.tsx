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
import { TeamOrDirectors } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createTeamsDirectorSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type TeamsDirectorsFormData = z.infer<typeof createTeamsDirectorSchema>;

const TeamsDirectorsForm = ({ teamsDirectors }: { teamsDirectors?: TeamOrDirectors }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamsDirectorsFormData>({
    resolver: zodResolver(createTeamsDirectorSchema),
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
            formData.append("position", data.position);
            formData.append("bio", data.bio);
            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            if (teamsDirectors)
              await axios.patch(`/api/teamsdirectors/${teamsDirectors.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            else
              await axios.post("/api/teamsdirectors", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/teamsdirectors");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Member Name</FormLabel>
          <Input
            placeholder="Member Name "
            defaultValue={teamsDirectors?.name}
            fontSize="lg"
            {...register("name")}
          />
          <FormLabel fontSize="25px">Position</FormLabel>
          <Input
            placeholder="Member Position "
            defaultValue={teamsDirectors?.position}
            fontSize="lg"
            {...register("position")}
          />
          <ErrorsMessage>{errors.position?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Bio</FormLabel>

          <Input
            placeholder="Member Bio "
            defaultValue={teamsDirectors?.bio}
            fontSize="lg"
            {...register("bio")}
          />
          <ErrorsMessage>{errors.bio?.message}</ErrorsMessage>

          {/* File input for image */}
          <FormLabel fontSize="25px">Image</FormLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {teamsDirectors ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TeamsDirectorsForm;
