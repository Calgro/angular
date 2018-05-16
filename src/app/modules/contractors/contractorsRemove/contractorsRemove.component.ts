import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractorsremove',
  templateUrl: './contractorsRemove.component.html',
  styleUrls: ['./contractorsRemove.component.css']
})
export class ContractorsRemoveComponent implements OnInit {
  contractor: ContractorShort = new ContractorShort(null, null);
  contractorLoaded = false;
  noContractor = false;
  
  constructor(
    private contractorsService: ContractorsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  contractorSubscription;
  contractorID = this.contractorsService.contractorID;
  
  ngOnInit() {
    this.contractorSubscription = this.contractorsService.contractorDetailLoader.subscribe(
      (contractor: ContractorShort) => {
        if (contractor !== null) {
            this.contractor = contractor;
        } else {
            this.noContractor = true;
        }
        this.contractorLoaded = true;
      }
    );

    this.contractorsService.fetchContractor(this.contractorID);
  }

  onDelete(form: NgForm) {
    const contractorID = this.contractor.contractorID;

    alertify.success('Deleting contractor.  You will be notified once complete.');

    const contractorDelete = {
      'contractorID': contractorID
    };

    this.http.put('https://' + this.devService.domain + '/api/v1/contractors', contractorDelete).subscribe(
      (resp: Outcome) => {
        if (resp.statusCode === '200') {
            alertify.success(resp.message);
            this.router.navigate(['/admin/contractors/list']);
        }
      },
      (error: HttpErrorResponse) => {
       alertify.error(error.status + ' - ' + error.statusText);
      }
    );
  }
  
  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }  

}
