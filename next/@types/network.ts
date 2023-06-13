export interface Coordinator {
    fullName: string
}

export interface Contact {
    email: string
}

export type Dataset = string //TBD

export type Publication = string //TBD

export interface Atlas {
    datasets: Dataset[]
    name: string
    publications: Publication[]
    updatedAt: string
    version: string
}

export interface Network {
    atlases: Atlas[]
    contact: Contact
    coordinators: Coordinator[]
    descriptionFile: string
    name: string
    path: string
}