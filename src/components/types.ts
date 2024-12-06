export type JobEType= "React.FormEvent<HTMLFormElement>" | "React.ChangeEvent<HTMLSelectElement>" | "React.ChangeEvent<HTMLInputElement>" | "React.ChangeEvent<HTMLTextAreaElement>" | any ;

export type keyType = any;
export interface Company {
    name:string;
    description:string;
    contactEmail:string;
    contactPhone:string;
  }
  export interface SingleJob {
    id:string;
    salary:string;
    description:string;
    type:string;
    location:string;
    title:string;
    company:Company;
  
  }