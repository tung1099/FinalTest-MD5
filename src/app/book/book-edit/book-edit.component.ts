import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../service/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  id: number;
  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getBook(this.id);
    });
  }

  ngOnInit() {
  }

   getBook(id: number) {
    return this.bookService.getBookById(id).subscribe(book => {
      this.bookForm = new FormGroup({
        title: new FormControl(book.title),
        author: new FormControl(book.author),
        description: new FormControl(book.description),
      });
    });
  }
  editBook(id: number) {
    const book = this.bookForm.value;
    this.bookService.editBook(id, book).subscribe(() => {
      Swal.fire({
        position: 'top-left',
        icon: 'success',
        title: 'Chỉnh sửa thành công',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['book']);
    });
  }
}
