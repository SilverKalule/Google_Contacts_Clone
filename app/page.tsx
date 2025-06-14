import { getContacts } from "@/actions/contacts";
import Contacts from "@/components/contacts";
import React from "react";

export default async function Home() {
  const contacts = (await getContacts()) || [];
  return (
    <div>
      <Contacts contacts={contacts} />
    </div>
  );
}
