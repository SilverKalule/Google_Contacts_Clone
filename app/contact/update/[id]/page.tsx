import { getContactById } from "@/actions/contacts";
import CreateContact from "@/components/createContact";
import { notFound } from "next/navigation";
import React from "react";

export default async function Update({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id = "" } = await params;
  const contact = await getContactById(id);
  if (!contact) {
    return notFound();
  }

  return (
    <div>
      <CreateContact initialData={contact} editingId={id} />
    </div>
  );
}
