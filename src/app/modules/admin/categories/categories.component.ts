import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class CategoriesComponent implements OnInit {
  categoryDialog!: boolean;
  categories!: Category[];
  category!: Category;
  selectedCategories!: Category[];
  submitted!: boolean;
  statuses!: any[];
  categoryForm!:FormGroup ;
  errorMessage = '';


  constructor(private categoryService:CategoryService,
  private messageService: MessageService, private confirmationService: ConfirmationService,
  private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response:any)=>{
      this.categories=response["data"];
      console.log(this.categories);
    })
        this.categoryForm = this.formBuilder.group({
          name: new FormControl(''),
        });
  }
  openNew() {
    this.category={};
    this.submitted = false;
    this.categoryDialog = true;
}
onSave(){
    const {name} = this.categoryForm.value;
  
    console.log('éaaa',name);
    // this.categoryService.createCategorie(name).subscribe(
    //     data=>{
    //       console.log("categorie is successfully created");
    //       window.location.reload();
    //     },
    //     err=>{
    //         this.errorMessage = err.error.message;
    //     }
    // )

}

deleteselectedCategories() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected categories?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
            // this.selectedCategories = null ;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'categories Deleted', life: 3000});
        }
    });
}

editCatogory(category: Category) {
    this.category = {...category};
    this.categoryDialog = true;
}

deleteCategory(category: Category) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + category.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.categories = this.categories.filter(val => val._id !== category._id);
            this.category={};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'categories Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
}

saveCategory() {
    this.submitted = true;
    if (this.category.name?.trim()) {
        if (this.category._id) {
            this.categories[this.findIndexById(this.category._id)] = this.category;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'category Updated', life: 3000});
        }
        else {
            this.onSave();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'category Created', life: 3000});
        }

        this.categories = [...this.categories];
        this.categoryDialog = false;
        this.category={} ;
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
}
getEventValue($event:any) :string {
    return $event.target.value;
  } 

}
