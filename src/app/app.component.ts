import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  addForm: FormGroup;
  searchForm: FormGroup;
  booleanValue = false;
  noResult = false;
  title = 'phoneDirectory';
  data = [
    { name: 'aman', number: 9440717743, email: 'ram@google.com' },
    { name: 'bhiman', number: 9704449668, email: 'ram@oracle.com' },
    { name: 'come on', number: 8978622830, email: 'ram@gmail.com' },
  ];


  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.searchForm = this.fb.group({
      searchNumber: [''],
    });

    this.searchForm.get('searchNumber').valueChanges.subscribe((value) => {
      this.data = this.data.filter((res) => res.number.toString().includes(value));
      if(this.data.length == 0){
        this.noResult = true;
      }
    });
  }

  onSubmit(): void {
    this.data.push(this.addForm.value);
    this.sort('name', false);
    this.addForm.reset();
  }
  search(): void {
    if(this.searchForm.get('searchNumber').value){
      this.data = this.data.filter((res) => res.number.toString().includes(this.searchForm.get('searchNumber').value));
      if(this.data.length == 0){
        this.noResult = true;
      }
    }

  }

  sort(colName, boolean) {
    if (boolean == true) {
      this.data.sort((a, b) =>
        a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    } else {
      this.data.sort((a, b) =>
        a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    }
  }
}
