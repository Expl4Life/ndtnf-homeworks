import {EMPTY, fromEvent} from 'rxjs'
import {map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

const GIT_HUB_URL = 'https://api.github.com/search/repositories?q='
const GIT_LAB_URL = 'https://gitlab.com/api/v4/projects?search='

const searchGithub: HTMLElement = document.getElementById('search');
const searchGitlab: HTMLElement = document.getElementById('search1');
const result: HTMLElement = document.getElementById('result');

const streamGithub$ = fromEvent(searchGithub, 'input')
  .pipe(
    map((e: any) => e.target.value),
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => result.innerHTML = ''),
    filter(v => v.trim()),
    switchMap(v => ajax.getJSON(GIT_HUB_URL + v).pipe(
      catchError(err => EMPTY)
    )),
    map((response: any) => response.items),
    mergeMap(items => items)
  )


streamGithub$.subscribe((data: any) => {
  console.log('%cindex.ts line:28 data', 'color: #007acc;', data);
  const html = `
    <div class="card">
      <div class="card-image">
        <div>Name:  ${data.name}</div>
        <div>Homepage: ${data.homepage}</div>
      </div>
      <div class="card-action">
        <a href="${data.html_url}" target="_blank">Открыть ${data.name}</a>
      </div>
    </div>
  `
  result.insertAdjacentHTML('beforeend', html)
})

const streamGitlab$ = fromEvent(searchGitlab, 'input')
  .pipe(
    map((e: any) => e.target.value),
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => result.innerHTML = ''),
    filter(v => v.trim()),
    switchMap(v => ajax.getJSON(GIT_LAB_URL + v).pipe(
      catchError(err => EMPTY)
    )),
    map((response: any) => response),
    mergeMap(items => items)
  )


streamGitlab$.subscribe((data: any) => {
  console.log('%cindex.ts line:28 data', 'color: #007acc;', data);
  const html = `
    <div class="card">
      <div class="card-image">
        <div>Name:  ${data.name}</div>
        <div>WEB url: ${data.web_url}</div>
      </div>
      <div class="card-action">
        <a href="${data.web_url}" target="_blank">Открыть ${data.name}</a>
      </div>
    </div>
  `
  result.insertAdjacentHTML('beforeend', html)
})