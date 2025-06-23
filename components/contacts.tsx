import React from "react";
import {
  AlignJustify,
  ArrowRightFromLine,
  CircleHelp,
  Download,
  EllipsisVertical,
  LayoutGrid,
  Pencil,
  Plus,
  Printer,
  Search,
  Settings,
  Star,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { contactProps } from "@/types/types";
import { contact } from "@prisma/client";
import Image from "next/image";

export default function Contacts({ contacts }: { contacts: contact[] }) {
  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <div className="flex justify-between items-center p-2 px-6 fixed w-full bg-gray-200 z-20">
        <nav className="flex justify-center items-center gap-4 text-2xl text-gray-600">
          <AlignJustify />
          <Users />
          <h2>Contacts</h2>
        </nav>
        <div className="bg-gray-100 flex items-center gap-2 p-2 flex-1 max-w-[600]">
          <Search className="text-gray-400" />
          <input
            placeholder="Search"
            className="flex-1 focus:outline-none"
            type="text"
          />
        </div>

        <div className="flex text-gray-600 gap-6">
          <CircleHelp />
          <Settings />
        </div>
        <div className="flex gap-6 text-gray-600">
          <LayoutGrid />
          <h2 className="w-8 rounded-full p-1 bg-blue-500 text-white flex justify-center items-center">
            SK
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-[20%_80%] flex-1 mt-16">
        <aside className="mx-6">
          <Button
            className="flex justify-center items-center gap-2 bg-blue-300 px-6 text-sm hover:bg-blue-300 cursor-pointer hover:shadow-xl font-semibold w-45 h-12 mt-4"
            variant="secondary"
          >
            <Plus />
            <Link href={"/createcontact"}>Create Contact</Link>
          </Button>
        </aside>
        <main className="flex h-[calc(100vh-6rem)] min-h-0 mx-4">
          <div className="bg-white rounded-4xl flex-1 p-6 pt-4 flex flex-col min-h-0">
            <header className="mb-4 border-b-2 pb-4 sticky top-0 bg-white z-10">
              <h2 className="text-2xl">Contacts({contacts.length})</h2>
              <div className="grid grid-cols-[_80%_20%]">
                <div className="grid grid-cols-[_35%_35%_30%]">
                  <h2>Name</h2>
                  <h2>Email</h2>
                  <h2>Phone Number</h2>
                </div>
                <div className="flex gap-4">
                  <Printer />
                  <ArrowRightFromLine className="rotate-270" />
                  <EllipsisVertical />
                </div>
              </div>
            </header>
            <div className="overflow-y-auto flex-1 min-h-0">
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => {
                  return (
                    <div
                      className="group grid grid-cols-[_80%_20%] cursor-pointer"
                      key={contact.id}
                    >
                      <div className="grid grid-cols-[_35%_35%_30%] p-1">
                        <div className="flex gap-4">
                          {contact.image ? (
                            <Image
                              src={contact.image}
                              width={100}
                              height={100}
                              className="w-8 h-8 object-cover rounded-full"
                              alt="contact image"
                            />
                          ) : (
                            <h2 className="w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-400 text-xl p-4">
                              {contact.name.toString().toUpperCase()[0]}
                            </h2>
                          )}
                          <h2>{contact.name}</h2>
                        </div>

                        <h2>{contact.email}</h2>
                        <h2 className="flex-1">{contact.phoneNumber}</h2>
                      </div>
                      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Star className="hidden" />
                        <a href={`/contact/update/${contact.id}`}>
                          <Pencil className="hover:text-blue-500" />
                        </a>
                        <EllipsisVertical className="hidden" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p>No Contact Created</p>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
}
