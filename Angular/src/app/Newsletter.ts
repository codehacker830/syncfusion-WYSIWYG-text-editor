export class Newsletter {

  id: number = undefined;
  object: string = undefined;
  created_at: string = undefined;
  draft: boolean = undefined;
  content: string = undefined;

  constructor (id?: number, object?: string, created_at?: string,
  draft?: boolean, content?: string) {
    this.id = id;
    this.object = object;
    this.created_at = created_at;
    this.draft = draft;
    this.content = content;
  }

}
