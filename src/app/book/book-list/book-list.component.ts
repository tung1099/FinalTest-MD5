import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';

declare var $: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  bookLength: number;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAllBook();
  }

   getAllBook() {
     this.bookService.getAllBook().subscribe((data) => {
       this.books = data;
       this.bookLength = data.length;
       // tslint:disable-next-line:only-arrow-functions
       $(function() {
         $('#products').DataTable({
           paging: true,
           lengthChange: false,
           searching: true,
           ordering: true,
           info: true,
           pageLength: 3,
           autoWidth: false,
           responsive: true,
         });
       });
     }, (error) => {
       console.log(error);
     });
   }
}
