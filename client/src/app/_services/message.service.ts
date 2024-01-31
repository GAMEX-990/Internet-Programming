import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_modules/Message';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, label: string = "Unread") {
    let httpParams = getPaginationHeaders(pageNumber, pageSize)
    httpParams = httpParams.append('Label', label)

    const url = this.baseUrl + 'messages'

    return getPaginationResult<Message[]>(url, httpParams, this.http)
  }
}