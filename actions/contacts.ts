"use server";

import prisma from "@/prisma/prisma";
// import prisma from "@/prisma/prisma";
import { contactProps } from "@/types/types";
import { error } from "console";

export async function createContact(data: contactProps) {
  try {
    // console.log(data);
    if (data.phoneNumber.length !== 10) {
      return {
        success: false,
        error: "Phone must be 10 numbers",
      };
    }
    //Check if phoneNumber exixts before loading it
    const existingNumber = await prisma.contact.findFirst({
      where: {
        phoneNumber: data.phoneNumber,
      },
    });
    if (existingNumber) {
      return {
        success: false,
        error: "Contact already exists",
      };
    }
    const newContact = await prisma.contact.create({
      data,
    });
    return { success: true, error: null };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

// Fetch data for mapping in the UI
export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return contacts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getContactById(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });
    return contact;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateContactById(id: string, data: contactProps) {
  try {
    const existing = await prisma.contact.findFirst({
      where: {
        phoneNumber: data.phoneNumber,
        NOT: {
          id,
        },
      },
    });
    if (existing) {
      return {
        success: false,
        error: "Contact already exists",
      };
    }
    const contact = await prisma.contact.update({
      where: {
        id,
      },
      data,
    });
    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "something went wrong",
    };
  }
}
