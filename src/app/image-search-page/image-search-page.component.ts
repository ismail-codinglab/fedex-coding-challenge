import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, delayWhen, filter } from 'rxjs/operators';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse, GiphyItem } from './giphyResponse.interface';
import { BadWordsValidator } from '../shared/bad-words.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-search-page',
  templateUrl: './image-search-page.component.html',
  styleUrls: ['./image-search-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageSearchPageComponent implements OnInit {
  public searchForm: FormGroup;
  public loading: boolean;
  public gifs: Array<GiphyItem>;
  public pagination: {
    totalCount: number;
    count: number;
    offset: number;
    currentPage: number;
  };
  protected limit: number = 25;

  constructor(private http: HttpClient) {}

  errorMessage: string;

  ngOnInit() {
    this.createForm();
    this.subscribeToSearch();
  }

  public get searchControl() {
    return this.searchForm.get('search');
  }

  public get offsetControl() {
    return this.searchForm.get('offset');
  }

  private createForm() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required, BadWordsValidator()]),
      offset: new FormControl(0, []),
    });
  }

  public searchGiphy(query: string, offset: number): Promise<GiphyResponse> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      this.http
        .get(environment.giphySearchUrl, {
          responseType: 'json',
          params: {
            api_key: environment.apiKey,
            q: query,
            offset: String(offset),
          },
        })
        .pipe(
          // minimum 1000ms delay to show loading screen
          delayWhen(() => timer(1000 - (Date.now() - startTime))),
          map((data) => resolve(data as GiphyResponse)),
        )
        .subscribe();
    });
  }

  private subscribeToSearch() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500), // prevent double queries when typing
        filter(() => this.searchForm.valid), // only valid
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), // prevent same query
        map(this.resetOffsetWhenSearchIsChanged.bind(this)),
        map(this.getGiphys.bind(this)),
      )
      .subscribe();
  }

  private resetOffsetWhenSearchIsChanged() {
    if (!this.searchControl.pristine) {
      this.offsetControl.setValue(0, { emitEvent: false });
      this.searchControl.markAsPristine();
    }
  }

  private async getGiphys() {
    this.loading = true;
    const result = await this.searchGiphy(this.searchControl.value, this.offsetControl.value);
    this.gifs = result.data;
    this.pagination = {
      // set pages & current page
      totalCount: result.pagination.total_count,
      count: result.pagination.count,
      offset: result.pagination.offset,
      currentPage: 1 + Math.floor(result.pagination.offset / this.limit),
    };
    this.loading = false;
  }

  public changedPage(page: number) {
    page = page - 1; // page 1 will become 0
    if (this.offsetControl.value === page * this.limit) {
      return;
    } // skip same page click
    this.offsetControl.setValue(page * this.limit);
  }
}
