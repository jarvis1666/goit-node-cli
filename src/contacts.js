

import path from 'path'
import { promises as fs } from 'fs';
//npm install uuid
import { v4 as uuidv4 } from 'uuid';


const contactsPath = path.resolve('db', 'contacts.json');
// console.log(contactsPath);


async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const readContacts = await fs.readFile(contactsPath)
        const arrContacts = JSON.parse(readContacts)
        // console.log(arrContacts);
        return arrContacts;
       
    } catch (error) {
        return error;
    }
    
}
// listContacts(contactsPath)

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const Contacts = await listContacts();
        const objContact = Contacts.find(contact => contact.id === contactId)
        return objContact || null;

    } catch (error) {
        return error;
    }
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const Contacts =await listContacts();
        const idxContact = Contacts.findIndex(contact => contact.id === contactId);
        if (idxContact === -1) {
            return null;
        }
        const removedContact = Contacts.splice(idxContact, 1)[0]; 
        await fs.writeFile(contactsPath, JSON.stringify(Contacts, null, 2));
        return removedContact;

    } catch (error) {
        return error;
    }
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    try {
        const Contacts =await listContacts();
        const newContact = {
            id: uuidv4(),
            name: name,
            email: email,
            phone: phone,
        }
        Contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(Contacts, null, 2));

        return newContact;
      
    } catch (error) {
        return error;
  }
}
export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}