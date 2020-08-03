import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  employeeData = { nik: '', name: '', divisions_id: '', position_id: '', type: "PROMOTION" };

  divisions;
  positions;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData.nik = data.data.nik;
      this.employeeData.name = data.data.name;
      this.employeeData.divisions_id = data.data.divisionsId;
      this.employeeData.position_id = data.data.positionsId;
    });

    this.getDivision();
    this.getPosition();
  }

  getDivision() {
    return this.restApi.getDivisions().subscribe((data: {}) => {
      this.divisions = data.data;
    })
  }

  getPosition() {
    return this.restApi.getPositions().subscribe((data: {}) => {
      this.positions = data.data;
    })
  }

  updateEmployee() {
    if(window.confirm('Are you sure, you want to update?')){
      console.log(this.employeeData);
      this.restApi.updateEmployee(this.id, this.employeeData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }

}
