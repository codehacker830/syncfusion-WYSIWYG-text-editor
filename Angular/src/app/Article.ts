export class Article {

  id: number = undefined;
  title: string = undefined;
  description: string = undefined;
  created_at: string = undefined;
  draft: boolean = undefined;
  content: string = undefined;

  constructor (id?: number, title?: string, description?: string,
    created_at?: string, draft?: boolean, content?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.draft = draft;
    this.content = content;
  }

}
