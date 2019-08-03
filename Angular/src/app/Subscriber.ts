export class Subscriber {

  id: number = undefined;
  name: string = undefined;
  email: string = undefined;
  created_at: string = undefined;

  constructor (id?: number, name?: string, email?: string, created_at?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
  }

}
