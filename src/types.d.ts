export interface IContactForm {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface IContacts extends IContactForm {
    id: string;
}

export interface IContactsAPI {
    [key: string]: IContactForm;
}

export interface IUpdateContact {
    id: string;
    contact: IContact;
}