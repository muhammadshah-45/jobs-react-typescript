export type JobEType= "React.FormEvent<HTMLFormElement>" | "React.ChangeEvent<HTMLSelectElement>" | "React.ChangeEvent<HTMLInputElement>" | "React.ChangeEvent<HTMLTextAreaElement>" | any ;

export type keyType = any;
export interface Company {
    name:string;
    description:string;
    contactEmail:string;
    contactPhone:string;
  }
  export interface SingleJob {
    id:string | number;
    salary:string;
    description:string;
    type:string;
    location:string;
    title:string;
    company:Company;
  
  }
  export type JobType = {
    type:string;
    title:string;
    description:string;
    salary:string;
    location:string;
  }
  export type JobIdType = number | string;

  export type Job = {
    id:number;
    title:string;
  } 
  export type JobsState ={
    jobs:Job[];
    jobData:Job[];
    allJobs:Job[];
    status:'idle' | "loading" | 'failed' | 'succeeded';
    error: string | null;
  }


  
