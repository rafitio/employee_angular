import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  divisions;
  positions;

  selectedDivision;
  selectedPosition;

  sequence : string;
  @Input() employeeDetails = { nik: '', name: '', divisions_id: '', position_id: '', type: "PROMOTION" }

  constructor( 
    public restApi: RestApiService, 
    public router: Router
    ) { }

  ngOnInit(): void {
    this.countSeq();
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

  countSeq() {
    return this.restApi.countSequence().subscribe((data: {}) => {
      console.log(data);
      this.employeeDetails.nik = 'EM' + data;
    })
  }

  addEmployee() {
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.router.navigate(['/employees-list'])
    })
  }

}
