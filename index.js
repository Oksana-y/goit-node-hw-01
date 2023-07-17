import contactsService from "./db/contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsService.listContacts();
        return console.log(allContacts);
      case "get":
        const oneContact = await contactsService.getContactById(id);
        return console.log(oneContact);
      case "add":
        const newContact = await contactsService.addContact(name, email, phone);
        return console.log(newContact);
      case "remove":
        const deleteContact = await contactsService.removeContact(id);
        return console.log(deleteContact);
      default:
        console.log("Unknown action");
    }
  } catch (error) {
    console.log(error.message);
  }
};

invokeAction(argv);
