import { Mail } from '../../interfaces/mail';

export class LoadMails {
  static readonly type = '[Mail] Load Mails';
}

export class AddMail {
  static readonly type = '[Mail] Add mail';

  constructor(readonly mail: Mail) {}
}

export class RemoveMailAction {
  static readonly type = '[Mail] Remove mail';

  constructor(readonly mailId: number) {}
}

export class MarkMailAsRead {
  static readonly type = '[Mail] Mark as Read';

  constructor(public mailId: number) {}
}
