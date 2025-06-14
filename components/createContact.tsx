"use client";
import { contactProps } from "@/types/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { createContact, updateContactById } from "@/actions/contacts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { contact } from "@/lib/generated/prisma";

export default function CreateContact({
  editingId,
  initialData,
}: {
  editingId?: string;
  initialData?: contact;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<contactProps>({
    defaultValues: {
      email: initialData?.email,
      name: initialData?.name,
      phoneNumber: initialData?.phoneNumber,
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function saveData(data: contactProps) {
    setLoading(true);
    // console.log(data);
    if (editingId) {
      //update
      const res = await updateContactById(editingId, data);
      if (res.success) {
        toast.success("Contact Update Successfully");
        reset();
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    } else {
      //create new
      const res = await createContact(data);
      if (res.success) {
        toast.success("Contact created Successfully");
        reset();
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <form
        onSubmit={handleSubmit(saveData)}
        action=""
        className="flex gap-2 flex-col w-[40%] border bg-white p-6 text-2xl rounded"
      >
        <div className="mx-auto mb-4 text-blue-600">
          {editingId ? "Update" : "Enter New"} Contact Information
        </div>
        <div className="grid grid-cols-[_30%_70%]">
          <label htmlFor="">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="border border-gray-600"
          />
        </div>
        <div className="grid grid-cols-[_30%_70%]">
          <label htmlFor="">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            className="border  border-gray-600"
          />
        </div>
        <div className="grid grid-cols-[_30%_70%]">
          <label htmlFor="">Phone Number</label>
          <input
            {...register("phoneNumber", { required: true })}
            type="text"
            className="border  border-gray-600"
          />
        </div>
        <Button
          type="submit"
          className="bg-green-600 cursor-pointer hover:bg-green-800 mt-6"
        >
          {loading
            ? "Loading..."
            : editingId
            ? "Update Contact"
            : "Create New Contact"}
        </Button>
      </form>
    </div>
  );
}
