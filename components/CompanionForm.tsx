"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.action";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.number().min(1, { message: "Duration is required." }),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(data);

    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log("Failed to create companion");
      redirect("/");
    }
  };

  return (
    <Card className="w-full sm:max-w-md shadow-2xl shadow-black">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* COMPANION NAME */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Companion Name
                  </FieldLabel>
                  <Input
                    {...field}
                    name={field.name}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the companion name"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* SUBJECT */}
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-subject">
                    Subject
                  </FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <SelectTrigger id="form-rhf-demo-subject" className="input">
                      <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subjects.map((subject) => (
                          <SelectItem
                            key={subject}
                            value={subject}
                            className="capitalize"
                          >
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* TOPIC */}
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-topic">
                    What should the companion help with?
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-topic"
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="E.g. Algebra, World War II, English Literature..."
                    autoComplete="off"
                    className="input "
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* VOICE  */}
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-voice">Voice</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <SelectTrigger className="input" id="form-rhf-demo-voice">
                      <SelectValue placeholder="Select the voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Male" className="">
                          Male
                        </SelectItem>
                        <SelectItem value="Female" className="">
                          Female
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* STYLE */}
            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-style">Style</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <SelectTrigger className="input " id="form-rhf-demo-style">
                      <SelectValue placeholder="Select the style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="formal" className="">
                          Formal
                        </SelectItem>
                        <SelectItem value="casual" className="">
                          Casual
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* DURATION */}
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-duration">
                    Duration (in minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-duration"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the duration in minutes"
                    autoComplete="off"
                    className="input"
                    type="number"
                    name={field.name}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" className="cursor-pointer">
            Build Your Companion
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CompanionForm;
