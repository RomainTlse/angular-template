import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Mail } from '../../interfaces/mail';
import {
  AddMail,
  LoadMails,
  MarkMailAsRead,
  RemoveMailAction,
} from './mail.actions';
import { MailService } from '../../services/mail.service';

export class MailStateModel {
  mails: Mail[] = [];
  mailCount = 0;
}

@State<MailStateModel>({
  name: 'mails',
  defaults: {
    mails: [],
    mailCount: 0,
  },
})
@Injectable()
export class MailState {
  private _mailService = inject(MailService);

  @Selector()
  static getState(state: MailStateModel) {
    return state;
  }

  @Selector()
  static getAllMails(state: MailStateModel): Mail[] {
    return state.mails;
  }

  @Action(LoadMails)
  loadMails(ctx: StateContext<MailStateModel>) {
    return this._mailService.getMails().subscribe((mails) => {
      ctx.setState({
        mails: mails,
        mailCount: mails.length,
      });
    });
  }

  // Action pour ajouter un mail
  @Action(AddMail)
  addMail(
    { getState, patchState }: StateContext<MailStateModel>,
    { mail }: AddMail
  ): void {
    const state = getState();
    const updatedMails = [...state.mails, mail];
    patchState({
      mails: updatedMails,
      mailCount: updatedMails.length,
    });
  }

  // Action pour marquer un mail comme lu
  @Action(MarkMailAsRead)
  markMailAsRead(
    ctx: StateContext<MailStateModel>,
    { mailId }: MarkMailAsRead
  ): void {
    const state = ctx.getState();
    const mails = state.mails.map((mail) =>
      mail.id === mailId ? { ...mail, is_open: true } : mail
    );
    ctx.setState({
      ...state,
      mails,
    });
  }

  @Action(RemoveMailAction)
  removeMail(ctx: StateContext<MailStateModel>, { mailId }: RemoveMailAction) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      mails: state.mails.filter((mail) => mail.id !== mailId),
    });
  }
}
