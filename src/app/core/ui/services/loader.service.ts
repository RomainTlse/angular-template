import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loader } from '../interfaces/loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader: Subject<Loader> = new Subject<Loader>();
  public loaderState = this._loader.asObservable();

  /**
   * show the loader
   */
  public show(): void {
    this._loader.next(<Loader>{ show: true });
  }

  /**
   * hide the loader
   */
  public hide(): void {
    this._loader.next(<Loader>{ show: false });
  }
}
