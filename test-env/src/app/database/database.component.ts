import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface CustomerData {
  ssn: string;
  name: string;
  age: number;
  email: string;
}
const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' }
];
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  private db: IDBDatabase;
  private objectStore: IDBObjectStore;
  private data: CustomerData[] = [];
  private form: FormGroup;
  private ssn: FormControl;
  private name: FormControl;
  private age: FormControl;
  private email: FormControl;
  constructor() { }

  ngOnInit() {
    this.ssn = new FormControl('', [Validators.maxLength(10), Validators.required]);
    this.name = new FormControl('');
    this.age = new FormControl(0, [Validators.max(120), Validators.min(0)]);
    this.email = new FormControl('', Validators.email);
    this.form = new FormGroup({
      ssn: this.ssn,
      name: this.name,
      age: this.age,
      email: this.email
    });
    const request = window.indexedDB.open('DB5', 5);
    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };
    request.onerror = (event: Event) => {
      alert('Database error: ' + (event.target as IDBOpenDBRequest).error.message);
    };
    request.onupgradeneeded = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.objectStore = this.db.createObjectStore('store', { keyPath: 'ssn' });
      this.objectStore.createIndex('name', 'name', { unique: false });
      this.objectStore.createIndex('email', 'email', { unique: true });
      for (const i of customerData) {
        this.objectStore.add(i);
      }
      console.log('Success');
    };
  }

  private getData() {
    const tran = this.db.transaction(['store'], 'readonly');
    tran.onerror = (event: Event) => {
      alert('Database error: ' + (event.target as IDBTransaction).error.message);
    };
    tran.oncomplete = (event: Event) => {
      console.log('Complete');
    };
    const objStore = tran.objectStore('store');
    const req = objStore.getAll();
    req.onsuccess = (event: Event) => {
      this.data = (event.target as IDBRequest).result as CustomerData[];
    };
  }

  private clearForm() {
    this.ssn.setValue('');
    this.name.setValue('');
    this.age.setValue(0);
    this.email.setValue('');
  }

  private onSubmit() {
    const dataToSend: CustomerData = {
      ssn: this.ssn.value,
      name: this.name.value,
      age: this.age.value,
      email: this.email.value
    };
    const tran = this.db.transaction(['store'], 'readwrite');
    const store = tran.objectStore('store');
    const request = store.add(dataToSend);
    request.onsuccess = () => {
      this.clearForm();
    };
  }

  private handleInput(event: Event, key: string) {
    (this[key] as FormControl).setValue((event.target as HTMLInputElement).value);
  }

}
