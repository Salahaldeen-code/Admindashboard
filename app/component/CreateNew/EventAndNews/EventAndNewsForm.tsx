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
import { NewsEvents } from "@prisma/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createNewsEventsSchema } from "./ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsMessage from "../../ErrorsMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

type EventsAndNewsFormData = z.infer<typeof createNewsEventsSchema>;

const EventAndNewsForm = ({ newsEvents }: { newsEvents?: NewsEvents }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventsAndNewsFormData>({
    resolver: zodResolver(createNewsEventsSchema),
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
            formData.append("date", data.date);
            formData.append("short_description", data.short_description);
            formData.append("description", data.description);

            // Append file to FormData if selected
            if (selectedFile) {
              formData.append("image", selectedFile);
            }

            // Send data to the API
            if (newsEvents)
              await axios.patch(
                `/api/eventandnews/${newsEvents.id}`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
            else
              await axios.post("/api/eventandnews", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            router.push("/admin/tables/eventnews");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <VStack spacing={4} align="stretch" marginTop={12} padding={3}>
          <FormLabel fontSize="25px">Title</FormLabel>
          <Input
            placeholder="Event Title"
            defaultValue={newsEvents?.title}
            fontSize="lg"
            {...register("title")}
          />
          <ErrorsMessage>{errors.title?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Date</FormLabel>
          <Input
            type="date"
            defaultValue={newsEvents?.date}
            {...register("date")}
          />
          <ErrorsMessage>{errors.short_description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Short Description</FormLabel>
          <Input
            placeholder="Short Description"
            defaultValue={newsEvents?.short_description}
            {...register("short_description")}
          />
          <ErrorsMessage>{errors.short_description?.message}</ErrorsMessage>

          <FormLabel fontSize="25px">Description</FormLabel>
          <Controller
            name="description"
            defaultValue={newsEvents?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field}></SimpleMDE>
            )}
          ></Controller>
          {errors.description && (
            <ErrorsMessage>{errors.description.message}</ErrorsMessage>
          )}

          <FormLabel fontSize="25px">Image</FormLabel>
          {/* File input for image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Button type="submit" colorScheme="teal">
            {newsEvents ? "Update" : "Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EventAndNewsForm;
