import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { MailState, MailStateModel } from './mail.state';
import { AddMail } from './mail.actions';
import { provideHttpClient } from '@angular/common/http';

describe('Mail store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideStore([MailState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: MailStateModel = {
      mails: [
        {
          id: 1,
          expediteur: {
            id: 1,
            nom: 'Doe',
            prenom: 'John',
            mail: 'john.doe@mail.fr',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANASURBVEiJrZVbaBxVHMZ/58zs7OxustltrDWxadFaI42S1qCBmLQpaKFapI2t2OqDiGJbREEQH2Kh4IuCQqnmRVBTL4jbBpE2tGKbtam5KBKhJSKhCIL2ksjuZDebvWTPHB9ilmKyu9nq9zRzvvN9vznD8B/BMrWns+e2vFKNAt2GEM8J9Nm+wVcOlMuJssUdRzcooXuBB/5lZQT0otT7fUOvjhfLy3IAJXTfEuUAtob92jA+fvyh9+pvCrBry5EXgMbSjyByShjpYq5ZzDjMYXlJy7cRWuzbvpLUrEsilcf2SmprPHw74nAtlgOhV/d/fzBeMWC8Pbxao8P33RVgR8eKRX5eab44MwWatXs6jq48fuHlqaV6ir4iF6MOYFtrzZL+9vYw6xvs+RvDWHpTKUCoWtfZlqRlQzVnhuKM/TpT8EYuJhgcm6b7+TUYElYFs6GKAYe6zKc7mv0IAfc3+UjlUgXPySRpvbcKryXYutHPoSfslyoG1Fh4mhvmbUu7VHuNghe2DUxXAbCxQWif1IGKAV6vfssVJNEQtCTNDVXknWnQmgfXhbDQACj0lGma71QM8D91cPSD0zPvJtMKGbARfhukBAEyYCMDNn85eXr6U2/49774Q8UAgHTeOvLdT04SACHwNm3CuP3Ogv/NaPy6uu4cK9VhlDJ/+e1UNuh/OLp+re/Z2qApdSKGTjoAXJxIZY+djLUe//G1yZsGAIxN9P9R63v0s5Y73GcMlE/PzZFMZCZ7vo43fnRy/+/l8mWn6YLSpz69jGad8AcQ3qqvvO3bupaTKztNASK90e7Rmfo1+dCtzHkCjFwxH4v0RruXky15guETw/fEkurE4DWaMq4uBDRgS0Fnnb4c8me72p585FJFgPFItGoyJz750/HszCkhclozMauw5fz2jKu5229gCYEhNfU1+fO3VLs7N+3a6pQFXPj8/JtXkubrqazw3LiedcErF18vyGe5qj6oPty8b/MBIYS7CDAaGWi56lgD8bQMFjvuchT2uYlVK1Rn2+4tP8MN/4Or09a5/1oOEE/LoHD0ABCGf76i4S/P7Y3PyqIzvVLFUkZoKBLdXQDkXbPt/ypfkDtntgP8DeQ7JPg1mm+yAAAAAElFTkSuQmCC',
          },
          objet: 'Objet du Mail',
          content:
            "Je suis le contenu du mail, et j'ai beaucoup de choses a raconter",
          dt_send: new Date('02/04/2025 14:35:22'),
          is_open: true,
        },
      ],
      mailCount: 1,
    };
    store.dispatch(
      new AddMail({
        id: 1,
        expediteur: {
          id: 1,
          nom: 'Doe',
          prenom: 'John',
          mail: 'john.doe@mail.fr',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANASURBVEiJrZVbaBxVHMZ/58zs7OxustltrDWxadFaI42S1qCBmLQpaKFapI2t2OqDiGJbREEQH2Kh4IuCQqnmRVBTL4jbBpE2tGKbtam5KBKhJSKhCIL2ksjuZDebvWTPHB9ilmKyu9nq9zRzvvN9vznD8B/BMrWns+e2vFKNAt2GEM8J9Nm+wVcOlMuJssUdRzcooXuBB/5lZQT0otT7fUOvjhfLy3IAJXTfEuUAtob92jA+fvyh9+pvCrBry5EXgMbSjyByShjpYq5ZzDjMYXlJy7cRWuzbvpLUrEsilcf2SmprPHw74nAtlgOhV/d/fzBeMWC8Pbxao8P33RVgR8eKRX5eab44MwWatXs6jq48fuHlqaV6ir4iF6MOYFtrzZL+9vYw6xvs+RvDWHpTKUCoWtfZlqRlQzVnhuKM/TpT8EYuJhgcm6b7+TUYElYFs6GKAYe6zKc7mv0IAfc3+UjlUgXPySRpvbcKryXYutHPoSfslyoG1Fh4mhvmbUu7VHuNghe2DUxXAbCxQWif1IGKAV6vfssVJNEQtCTNDVXknWnQmgfXhbDQACj0lGma71QM8D91cPSD0zPvJtMKGbARfhukBAEyYCMDNn85eXr6U2/49774Q8UAgHTeOvLdT04SACHwNm3CuP3Ogv/NaPy6uu4cK9VhlDJ/+e1UNuh/OLp+re/Z2qApdSKGTjoAXJxIZY+djLUe//G1yZsGAIxN9P9R63v0s5Y73GcMlE/PzZFMZCZ7vo43fnRy/+/l8mWn6YLSpz69jGad8AcQ3qqvvO3bupaTKztNASK90e7Rmfo1+dCtzHkCjFwxH4v0RruXky15guETw/fEkurE4DWaMq4uBDRgS0Fnnb4c8me72p585FJFgPFItGoyJz750/HszCkhclozMauw5fz2jKu5229gCYEhNfU1+fO3VLs7N+3a6pQFXPj8/JtXkubrqazw3LiedcErF18vyGe5qj6oPty8b/MBIYS7CDAaGWi56lgD8bQMFjvuchT2uYlVK1Rn2+4tP8MN/4Or09a5/1oOEE/LoHD0ABCGf76i4S/P7Y3PyqIzvVLFUkZoKBLdXQDkXbPt/ypfkDtntgP8DeQ7JPg1mm+yAAAAAElFTkSuQmCC',
        },
        objet: 'Objet du Mail',
        content:
          "Je suis le contenu du mail, et j'ai beaucoup de choses a raconter",
        dt_send: new Date('02/04/2025 14:35:22'),
        is_open: true,
      })
    );
    const actual = store.selectSnapshot(MailState.getState);
    expect(actual).toEqual(expected);
  });
});
