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
  categoryForm1!:FormGroup ;


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
        this.categoryForm1 = this.formBuilder.group({
            name: new FormControl(''),
          });
  }
  openNew() {
    this.category={};
    this.submitted = false;
    this.categoryDialog = true;
}
onSave(){
  
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
onDelete(categoryId:string){
    this.categoryService.deleteCategorie(categoryId).subscribe(
        (response: any) => {
            console.log(response);
          },
          (error: any) => {
            alert(error.message);
          }
    )}

editCatogory(category: Category) {
    this.category = {...category};
    this.categoryDialog = true;
}

deleteCategory(category: Category,id:string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + category.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.categories = this.categories.filter(val => val._id !== category._id);
            this.category={};
            category._id = id 
            this.onDelete(id);
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
            const {name} = this.categoryForm1.value;
            console.log(name)
            this.categories[this.findIndexById(this.category._id)] = this.category;
           this.categoryService.updateCategorie(name,this.category._id).subscribe((res:any)=>{
            console.log('res',res)
         },
         (error: any) => {
             alert(error.message);
           })
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'category Updated', life: 3000});
        }
        else {
            const {name} = this.categoryForm.value;
            console.log('éafsdfaa',name);
            this.categoryService.createCategorie(name).subscribe((res:any)=>{
               console.log('res',res)
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'category Created', life: 3000});
            },
            (error: any) => {
                console.log('error',error)
                alert(error.message);
              })
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
