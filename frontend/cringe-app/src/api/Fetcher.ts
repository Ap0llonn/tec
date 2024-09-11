import axios, { AxiosResponse } from 'axios';

export interface Person {
  id?: number;
  name: string;
  pts: number;
}

export default class Fetcher {

    private static instance: Fetcher;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = '/api/person';
    }

    public static getInstance(): Fetcher {
        if (this.instance == null) {
            this.instance = new Fetcher();
        }
        return this.instance;
    }

    public async getAllPersons(): Promise<Person[]> {
        const response: AxiosResponse<Person[]> = await axios.get(this.baseUrl);
        return response.data;
    }

    public async getPersonById(id: number): Promise<Person> {
        const response: AxiosResponse<Person> = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    public async createOrUpdatePerson(person: Person): Promise<Person> {
        const response: AxiosResponse<Person> = await axios.post(this.baseUrl, person);
        return response.data;
    }

    public async deletePerson(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }
}
